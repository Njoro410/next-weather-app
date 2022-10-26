import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";
import Spinner from "../components/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      setMessage('')
    }).catch(error => {
      setMessage('Please enter a valid city name')
    });
    setCity("");
    setLoading(false);
  };

  // const fetchWeather = (e) => {
  //   try {
  //     e.preventDefault();
  //     setLoading(true);
  //    axios.get(url).then((response) => {
  //       setWeather(response.data);
  //     });
  //     setCity("");
  //     setLoading(false);
  //   } catch (error) {
  //     setErr(true);
  //     alert(error);
  //   }
  // };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Weather Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* {overlay} */}
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/40 z-[1]" />
        {/* {bg-image} */}
        <Image
          src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          layout="fill"
          className="object-cover"
        />

        {/* {search} */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                type="text"
                placeholder="Search City"
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        <div
          className={message ? "relative m-auto mt-4 bg-red-400 w-80 rounded z-10 transition duration-300" : "hidden"}
        >
          <p className="text-center py-3 text-white">{message}</p>
        </div>

        {/* {weather} */}
        {message ? '' : weather.main && <Weather data={weather} />}

      </div>
    );
  }
}
