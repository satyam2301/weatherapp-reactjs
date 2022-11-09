import './App.css';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from './assets/background.png';

function App() {
  const [query, setQuery] = useState({ q: 'New Delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';

      toast.info('Fetching weather for ' + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="h-max bg-violet-100">
      <div className="flex flex-wrap items-center pd-6 ">
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0 md:px-6">
          <div
            className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
            style={{ backPosition: '50%' }}
          >
            <img src={Background} className="w-full" />
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
              <div className="flex justify-center items-center h-full">
                <div className="px-6 py-12 md:px-12 text-center">
                  <Inputs
                    setQuery={setQuery}
                    units={units}
                    setUnits={setUnits}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {weather && (
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12 md:px-6">
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    </div>
  );
}

export default App;
