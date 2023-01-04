import { Button } from 'datocms-react-ui';
import CSVUpload from './CSVUpload';
import SelectChart from './SelectChart';
import GenerateRandomData from './GenerateRandomData';
import ChartOptions from './ChartOptions';

function Nav({ data, send, setData, state, chart, setChart }) {
  const navItem =
    'py-2 px-4 bg-blue-500 text-white font-semibold shadow-md hover: bg-blue-700  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';

  const navItemActive = 'py-2 px-4 bg-white text-black font-semibold shadow-md';

  const value = state.value as string;
  return (
    <div className="flex-none flex-col bg-gray-50 items-start justify-start">
      <div className={value === 'generate' ? navItemActive : navItem}>
        <Button onClick={() => send('GEN')}>GENERATE DATA</Button>
        {state.matches('generate') && (
          <div>
            <GenerateRandomData setData={setData} />
          </div>
        )}
      </div>
      {/* <div className={value === 'transform' ? navItemActive : navItem}>
        <Button onClick={() => send('TRANSFORM')}>TRANSFORM SOURCE</Button>
        {state.matches('transform') && (
          <div>
            <h1 className="title">Generate Data</h1>
          </div>
        )}
      </div> */}
      <div className={value === 'upload' ? navItemActive : navItem}>
        <Button onClick={() => send('UPLOAD')}>UPLOAD DATA</Button>
        {state.matches('upload') && (
          <div>
            <CSVUpload setData={(d) => setData(d)} />
          </div>
        )}
      </div>
      <div className={value === 'choose' ? navItemActive : navItem}>
        <Button onClick={() => send('CHOOSE')}>CHOOSE CHART</Button>
        {state.matches('choose') && (
          <div>
            <SelectChart setChart={setChart} chart={chart} />
          </div>
        )}
      </div>
      <div className={value === 'settings' ? navItemActive : navItem}>
        <Button onClick={() => send('SETTINGS')}>CHART OPTIONS</Button>
        {state.matches('settings') && (
          <div>
            <ChartOptions data={data} setData={setData} chart={chart} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
