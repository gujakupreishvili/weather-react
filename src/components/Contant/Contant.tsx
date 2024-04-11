import { useState } from "react";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import maxTemp from "../../assets/max temp.png";
import minTemp from "../../assets/min temp.png";
import humadity from "../../assets/humadity.png";
import cloud from "../../assets/Cloudy.png";
import wind from "../../assets/wind.png";

interface Types {
  city: string;
  current_temp: number;
  current_weather_icon: string;
  current_weather: string;
  current_time: string;
  temp_max: number;
  temp_min: number;
  humadity: number;
  cloudy: number;
  wind_speed: number;
  
  
}

export default function Contant() {
  const [data, setData] = useState<Types>({
    city: "London",
    current_temp: 16,
    current_weather_icon:cloud,
    current_weather: "",
    current_time: "",
    temp_max: 18,
    temp_min: 12,
    humadity: 57,
    cloudy: 87,
    wind_speed: 14,
  });
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter" && text === "") {
      alert("write something ");
      event.prevenDefault();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      // <div>{spiner}</div>
      setIsLoading(!false);
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=196cbe371f1c40f9ba3113741241402&q=${text}&days=7&aqi=yes&alerts=no`
      )
        .then((res) => res.json())
        .then((data) => {
          const info: Types = {
            city: data.location.name,
            current_temp: data.current.temp_c,
            current_weather_icon: data.current.condition.icon,
            current_weather: data.current.condition.text,
            current_time: data.location.localtime,
            temp_max: data.forecast.forecastday[0].day.maxtemp_c,
            temp_min: data.forecast.forecastday[0].day.mintemp_c,
            humadity: data.current.humidity,
            cloudy: data.current.cloud,
            wind_speed: data.current.wind_kph,
          };
          if(info.current_weather == "Partly cloudy"){
            document.body.className="partly-cloudy";
          }
          else if(info.current_weather == "Moderate rain"){
            document.body.className="rainy";
          }
          else if(info.current_weather=="Sunny"){
            document.body.className="sunny";
          }else if (info.current_weather=="Cloudy"){
            document.body.className="cloudy"
          }else if (info.current_weather=="Patchy rain nearby"){
            document.body.className= "light-rain"
          }
          setData(info);
          setIsLoading(false);
        });
      setText("");
    }
  };
  console.log(data);

  return (
    <>
      <header>
        <img src={logo} alt="logo" className="logo" />
        <form action="" className="input-form">
          <input
            type="text"
            placeholder="Search Location..."
            className="input"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyPress={handleEnterKeyPress}
          />
          <img src={search} alt="search" className="search" />
        </form>
      </header>
      <main>
        <div className="main-information">
          <h1 className="gradus">
            <span className="temp">{Math.round(data.current_temp)}</span>°
          </h1>
          <div className="city-div">
            <p className="city">{data.city}</p>
            <div className="day-div">
              <p className="time">06:09</p>
              <p className="week-day">Monday</p>
              <p className="data">24</p>
              <p className="month">Feb</p>
            </div>
          </div>
          <img src={data.current_weather_icon} className="cloud" />
        </div>
        <div className="about-weather">
          <p className="weather-details">Weather Details...</p>
          <p className="thunderstorm">thunderstorm with light drizzle</p>
          <div className="more-info">
            <div className="more-info-temp">
              <p>Temp max</p>
              <div className="tempruter">
                <p className="max-temp">
                  {data.temp_max }
                  <span>°</span>
                </p>
                <img src={maxTemp} alt="" className="max-temp" />
              </div>
            </div>
            <div className="more-info-temp">
              <p>Temp min</p>
              <div className="tempruter">
                <p className="min-temp">
                  {data.temp_min }
                  <span>°</span>
                </p>
                <img src={minTemp} alt="" className="max-temp" />
              </div>
            </div>
            <div className="more-info-temp">
              <p>Humadity</p>
              <div className="tempruter">
                <p className="humadity">
                  {data.humadity || "58"}
                  <span>%</span>
                </p>
                <img src={humadity} alt="" className="max-temp" />
              </div>
            </div>
            <div className="more-info-temp">
              <p>Cloudy</p>
              <div className="tempruter">
                <p className="cloud">
                  {data.cloudy || "86"}
                  <span>%</span>
                </p>
                <img src={cloud} alt="" className="max-temp" id="cloud" />
              </div>
            </div>
            <div className="more-info-temp">
              <p>Wind</p>
              <div className="tempruter">
                <p className="wind-speed">
                  <span className="wind-speed-span">
                    {data.wind_speed || "15"}
                  </span>
                  km/h
                </p>
                <img src={wind} alt="" className="max-temp" />
              </div>
            </div>
            <hr />
          </div>
        </div>
      </main>
    </>
  );
}
