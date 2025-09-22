export interface Geocoding {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
}


export interface CurrentData {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
}

export interface CurrentForecast {
    title: string;
    info: string;
}



export interface HourlyData {
    time: Date[];
    temperature_2m: Float32Array;
    weather_code: Float32Array;
    is_day: Float32Array;
}

export interface HourlyForecast {
    hour: string,
    temperature: string,
    weatherIcon: string
}



export interface DailyData {
    time: Date[];
    weather_code: Float32Array;
    temperature_2m_max: Float32Array;
    temperature_2m_min: Float32Array;
}

export interface DailyForecast {
    day: string;
    weatherIcon: string;
    minTemp: string;
    maxTemp: string;
}




export interface WeatherData {
    current: CurrentData;
    hourly: HourlyData;
    daily: DailyData;
}
