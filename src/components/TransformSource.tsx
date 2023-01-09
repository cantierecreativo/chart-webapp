import { Button, TextField } from 'datocms-react-ui';
import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { useForm } from 'react-hook-form';
import {
  generateItems,
  fillArray,
  transposeData,
  generateRandomData,
} from '../lib/utils';
import axios from 'axios';

function TransformSource({ setData, rawData }) {
  const [keys, setKeys] = useState([]);
  const [selection, setSelection] = useState(null);
  const [table, setTable] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState(
    'https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/candidature_altrienti_finanziate.json'
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    const { value, x, y } = data;
    const items = rawData.map((r) => {
      return {
        x: r[x],
        y: r[y],
        value: Number(r[value]),
      };
    });

    const xLabels = [...new Set(items.map((i) => i.x))].sort();
    console.log('x', xLabels, xLabels.length);
    const yLabels = [...new Set(items.map((i) => i.y))].sort();
    console.log('y', yLabels, yLabels.length);

    let cols = ['_', ...xLabels];
    let rows = yLabels.map((yv) => {
      let row = xLabels.map((xv) => {
        return items
          .filter((i) => i.x === xv && i.y === yv)
          .reduce((sum, item) => {
            item.value ? (sum += item.value) : (sum += 0);
            return sum;
          }, 0);
      });
      return [yv, ...row];
    });
    const matrix = [cols, ...rows];
    setData(matrix);
  };

  useEffect(() => {
    if (rawData) {
      const headers = Object.keys(rawData[0]);
      setKeys(headers);
      let rows = rawData.slice(0, 5).map((r) => {
        return Object.values(r);
      });
      return setPreview([headers, ...rows]);
    }
  }, [rawData]);

  return (
    <div className="w-full my-10">
      {!table && preview && (
        <DataTable data={preview} reset={null} transpose={null} />
      )}
      {table && (
        <div>
          <DataTable data={table} reset={null} transpose={null} />
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save data
          </Button>
        </div>
      )}
      {keys.length > 0 && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Value colum</p>
            <select {...register('value', { required: true })}>
              {keys.map((k) => (
                <option key={`value-${k}`} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <p>X column</p>
            <select {...register('x', { required: true })}>
              {keys.map((k) => (
                <option key={`x-${k}`} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <p>Y column</p>
            <select {...register('y', { required: true })}>
              {keys.map((k) => (
                <option key={`y-${k}`} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <div>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                submit
              </Button>
            </div>
          </form>
        </div>
      )}
      <hr />
    </div>
  );
}

export default TransformSource;
