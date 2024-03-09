import { Earth } from "./Earth";
import { Weather } from "./Weather";
import { 
  // getCurrentWeatherAPI, 
  getCityWeatherAPI 
} from "../utils/weatherApi"
import { cities } from '../utils/cities'
import { Fragment, useCallback, useEffect, useState } from "react";


export default function Scene(){
  const [content, setContent] = useState([])
  const getCitiesWeather = useCallback(()=>{
    const weatherKey = process.env.REACT_APP_API_KEY;
    try {
      // const res = await getCurrentWeather(44.04,10.99,weatherKey)
      const citiesPromise = cities.map((city) => getCityWeatherAPI(city, weatherKey))
      Promise.all(citiesPromise)
      .then(res => {
        setContent(res)
      })
      .catch(er => console.warn(er))
    } catch(err){
      console.warn(err)
    }
  }, [])

  useEffect(() => {
    getCitiesWeather()
  } ,[getCitiesWeather])

  useEffect(() => {
    console.log('%ccontent', 'color: lime', content)
  
    return () => {
      
    }
  }, [content])
  
  
  return (
    <>
      <Earth 
        position={[0,-2,0]} 
      />
      {
      content[0] && 
      content.map((e,i) => {
        return (
          <Fragment key={'weather' + i}>
            <Weather position={[-1 + i * 0.5, 0, 0]} weather={e.weather[0].main.toLocaleLowerCase()} />
          </Fragment>
        )
      })
      
      }
    </>
  )
}

