export const geoDbApiOptions = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${import.meta.env.VITE_GeoDB_API_KEY}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';


export const CurrentWeather_OpenWeather_API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
export const CurrentWeather_OpenWeather_CITY_API_URL = `https://api.openweathermap.org/data/2.5/weather?`
export const OpenWeather_API_key = `${import.meta.env.VITE_OpenWeather_API_KEY}`
export const HOURLY_FORECAST_OpenWeather_API_URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?`
export const DAILY_FORECAST_OpenWeather_API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?`;


export function getIconUrl(iconCode) {
	const baseIconUrl = 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/';
	const defaultUrl = '../assets/weatherIcons/';
	switch(iconCode) {
			case '01d':
					return `${baseIconUrl}clear-day.svg` || `${defaultUrl}01d.svg`;
			case '01n':
					return `${baseIconUrl}clear-night.svg` || `${defaultUrl}01n.svg`;
			case '02d':
					return `${baseIconUrl}partly-cloudy-day.svg` || `${defaultUrl}02d.svg`;
			case '02n':
					return `${baseIconUrl}partly-cloudy-night.svg` || `${defaultUrl}02n.svg`;
			case '03d':
					return `${baseIconUrl}cloudy.svg` || `${defaultUrl}03d.svg`;
			case '03n':
					return `${baseIconUrl}cloudy.svg` || `${defaultUrl}03n.svg`;
			case '04d':
					return `${baseIconUrl}overcast-day.svg` || `${defaultUrl}04d.svg`;
			case '04n':
					return `${baseIconUrl}overcast-night.svg` || `${defaultUrl}04n.svg`;
			case '09d':
					return `${baseIconUrl}overcast-day-drizzle.svg` || `${defaultUrl}09d.svg`;
			case '09n':
					return `${baseIconUrl}overcast-night-drizzle.svg` || `${defaultUrl}09n.svg`;
			case '10d':
					return `${baseIconUrl}partly-cloudy-night-rain.svg` || `${defaultUrl}10d.svg`;
			case '10n':
					return `${baseIconUrl}partly-cloudy-night-drizzle.svg` || `${defaultUrl}10n.svg`;
			case '11d':
					return `${baseIconUrl}thunderstorms-day-extreme-rain.svg` || `${defaultUrl}11d.svg`;
			case '11n':
					return `${baseIconUrl}thunderstorms-night-extreme-rain.svg` || `${defaultUrl}11n.svg`;
			case '13d':
					return `${baseIconUrl}partly-cloudy-day-snow.svg` || `${defaultUrl}13d.svg`;
			case '13n':
					return `${baseIconUrl}partly-cloudy-night-snow.svg` || `${defaultUrl}13n.svg`;
			case '50d':
					return `${baseIconUrl}partly-cloudy-day-haze.svg` || `${defaultUrl}50d.svg`;
			case '50n':
					return `${baseIconUrl}partly-cloudy-night-haze.svg` || `${defaultUrl}50n.svg`;
	}
}