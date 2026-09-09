import axios from "axios";
import { useState, KeyboardEvent } from "react";

interface IWeather {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number };
  visibility: number;
  weather: { id: number; description: string; main: string }[];
}

export default function Weather() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${api_key}&units=metric`,
      );
      setWeather(result.data);
      localStorage.setItem("last_weather", JSON.stringify(result.data));
    } catch (err: any) {
      if (err.response?.status === 404) {
        setErrorMessage("City not found. Please check spelling.");
      } else {
        setErrorMessage("Unable to fetch data. Check connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  const getWeatherIcon = (main?: string, desc?: string): string => {
    const text = `${main || ""} ${desc || ""}`.toLowerCase();

    if (text.includes("rain") || text.includes("drizzle")) return "/rain.png";
    if (text.includes("thunder") || text.includes("storm"))
      return "/thunderstorm.png";
    if (text.includes("snow")) return "/snow.png";
    if (text.includes("clear") || text.includes("sun")) return "/sun.png";
    if (
      text.includes("wind") ||
      text.includes("mist") ||
      text.includes("fog") ||
      text.includes("haze")
    )
      return "/wind.png";

    return "/clouds.png";
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d1117] text-slate-100 flex flex-col items-center justify-start px-4 py-12 selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden">
      {/* Background Ambient Glows (نورپردازی بک‌گراند بدون اسکرول افقی) */}
      <div className="pointer-events-none fixed top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/25 to-blue-500/20 blur-[130px] rounded-full" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[450px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        {/* Header Title */}
        <header className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
            Real-time Meteorological Intelligence
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Atmosphere
          </h1>
        </header>

        {/* Floating Search Bar */}
        <div className="w-full max-w-xl">
          <div className="group relative flex items-center bg-white/[0.04] hover:bg-white/[0.07] focus-within:bg-white/[0.08] backdrop-blur-xl border border-white/10 focus-within:border-cyan-500/60 rounded-2xl p-2 transition-all duration-300 shadow-2xl focus-within:shadow-cyan-500/10">
            <svg
              className="w-5 h-5 ml-3 text-slate-400 group-focus-within:text-cyan-400 transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by city (e.g. London, Tokyo, Tehran)..."
              className="w-full bg-transparent px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            />
            <button
              onClick={getWeather}
              disabled={isLoading}
              className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-white font-medium text-sm transition-all duration-200 shrink-0 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Explore"
              )}
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <p className="text-rose-400 text-xs mt-2.5 px-3 flex items-center gap-1.5 animate-fade-in">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              {errorMessage}
            </p>
          )}
        </div>

        {/* Dashboard Display */}
        {weather && (
          <main className="w-full space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Primary Glass Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Left: Location & Main Temperature */}
                <div className="text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-300">
                    <svg
                      className="w-4 h-4 text-cyan-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {weather.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                      {weather.sys.country}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-center sm:justify-start gap-3 pt-3">
                    <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white">
                      {Math.round(weather.main.temp)}°
                    </span>
                    <span className="text-slate-400 text-sm font-medium">
                      Feels like{" "}
                      <strong className="text-slate-200">
                        {Math.round(weather.main.feels_like)}°C
                      </strong>
                    </span>
                  </div>

                  <p className="text-base text-cyan-400 font-medium capitalize pt-1">
                    {weather.weather[0]?.description}
                  </p>
                </div>

                {/* Right: Dynamic Animated Weather Graphic */}
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-300" />
                  <img
                    src={getWeatherIcon(
                      weather.weather[0]?.main,
                      weather.weather[0]?.description,
                    )}
                    alt={weather.weather[0]?.description || "Weather state"}
                    className="relative w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Micro-Metrics Grid (۴ باکس تفکیکی تحلیلی) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Humidity */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-4 flex flex-col items-start gap-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Humidity
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {weather.main.humidity}%
                </span>
                <span className="text-[11px] text-slate-400">
                  Moisture level
                </span>
              </div>

              {/* Wind Speed */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-4 flex flex-col items-start gap-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Wind
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {weather.wind.speed}{" "}
                  <span className="text-xs font-normal">m/s</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Current velocity
                </span>
              </div>

              {/* Pressure */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-4 flex flex-col items-start gap-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Pressure
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {weather.main.pressure}{" "}
                  <span className="text-xs font-normal">hPa</span>
                </span>
                <span className="text-[11px] text-slate-400">Atmospheric</span>
              </div>

              {/* Visibility */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-4 flex flex-col items-start gap-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Visibility
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {(weather.visibility / 1000).toFixed(1)}{" "}
                  <span className="text-xs font-normal">km</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Horizontal scope
                </span>
              </div>
            </div>
          </main>
        )}

        {/* Empty State / Prompt */}
        {!weather && !isLoading && (
          <div className="mt-12 text-center text-slate-400 text-sm space-y-2">
            <p>
              Ready for inspection. Type any global city to fetch real-time
              atmospheric telemetry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
