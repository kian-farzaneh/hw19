import { FormControl, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface IWeather {
  name: string;
  sys: { country: string };
  main: { temp: string; feels_like: string };
  weather: { description: string; main: string }[]; 
}

export default function Weather() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [city,setCity] = useState<string | null>('')

  const api_key = "90218d7ad869ef14db558188ea696c1e";

  const weatherIcons: { [key: string]: string } = {
    Clouds: "clouds.png",
    Clear: "sun.png",
    Fog: "rain.png",
    Snow: "snow.png",
    Thunderstorm: "thunderstorm.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
  };

  const getWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );
    setWeather(result.data);
    if(city){
      localStorage.setItem(city,JSON.stringify(result.data))
    }
  };

  console.log(weather);

  return (
    <div className="bg-[#19191a] w-full h-screen text-white">
      <div className="w-80 absolute top-2 left-[540px]">
        <FormControl className="flex">
          <Input onChange={(e) => setCity(e.target.value)} type="email" />
          <button
            onClick={getWeather}
            className="bg-blue-700 p-1 ml-1 rounded-lg"
          >
            Search
          </button>
        </FormControl>
      </div>
      <div className="w-[90%] bg-blue-600 rounded-md absolute top-32 mx-[5%]">
        <div className="p-6 h-[220px]">
          <p className="font-bold text-3xl">{weather?.name}</p>
          <div className="font-medium mt-10 absolute">
            <p>
              Country : <span>{weather?.sys.country}</span>
            </p>
            <p>
              Tempeture : <span>{weather?.main.temp}</span>
            </p>
            <p>
              Feels like : <span>{weather?.main.feels_like}</span>
            </p>
            <p className="mt-1">{weather?.weather[0].description}</p>
          </div>

          <img
            src={`./${weather?.weather[0].main ? weatherIcons[weather.weather[0].main] : "default.png"}`}
            alt="Weather animation"
            className="w-32 rel relative bottom-5 left-[1030px]"
          />
        </div>
      </div>
    </div>
  );
}
