import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

function TimeAndLocation({
  weather: { details, dt, timezone, name, country },
}) {
  return (
    <div>
      <div class="flex mb-4">
        <div class="grow ml-4">
          <p class="font-bold mb-1">{formatToLocalTime(dt, timezone)}</p>
          <p class="text-gray-700 text-3xl">{`${name}, ${country}`}</p>
          <p class="text-gray-500 text-2xl">{`${details} Sky`}</p>
        </div>
      </div>
    </div>
  );
}

export default TimeAndLocation;
