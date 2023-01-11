import { useEffect, useState } from 'react';
import BasicChart from './charts/BasicChart';
import PieChart from './charts/PieChart';
import {
  toDataSource,
  getPieValues,
  getLineValues,
  getBarValues,
} from '../lib/utils';

function RenderChart({ chart, data, config = {} }) {
  function transformData(d, cfg) {
    if (!d) return null;
    console.log('add config', cfg);
    return toDataSource(d, cfg);
  }
  const [currentValue, setCurrentValue] = useState(transformData(data, config));

  useEffect(() => {
    console.log('CHANGE', chart, config);
    if (chart && data && config) {
      setCurrentValue(transformData(data, config));
    }
  }, [chart, data, config]);

  if (currentValue) {
    const formatted =
      chart === 'bar'
        ? getBarValues(currentValue)
        : chart === 'line'
        ? getLineValues(currentValue)
        : chart === 'pie'
        ? getPieValues(currentValue)
        : null;

    console.log('DATA', formatted);
  }
  return (
    <div className="w-full min-height-[800px]">
      {currentValue?.dataSource && (
        <div>
          {chart === 'bar' && <BasicChart data={getBarValues(currentValue)} />}
          {chart === 'line' && (
            <BasicChart data={getLineValues(currentValue)} />
          )}
          {chart === 'pie' && <PieChart data={getPieValues(currentValue)} />}
        </div>
      )}
    </div>
  );
}

export default RenderChart;
