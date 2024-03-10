import { Earth } from './Earth';
import { Weather } from './Weather';
import { 
  // getCurrentWeatherAPI, 
  getCityWeatherAPI 
} from '../utils/weatherApi'
import { cities } from '../utils/cities'
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Lights } from './Lights';
import { Bounds, Stars } from '@react-three/drei';
import FocusWeather from './FocusWeather';
import Clouds from './Clouds';


export default function Scene(){
  const [content, setContent] = useState([])

  const getCitiesWeather = useCallback(()=>{
    try {
      // const res = await getCurrentWeather(44.04,10.99,weatherKey)
      const citiesPromise = cities.map((city) => getCityWeatherAPI(city))
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
  
  function onFit(e){
    console.log(e)
  }
  
  return (
    <>
      <Lights />
      <Earth />
      <Clouds />
      <Stars
        radius={50} // 반지름
        depth={50}
        count={1000}
        factor={4} // 별의 크기
        saturation={0} // 채도
        fade
        speed={1} // 깜빡이는 속도
      />
      <Bounds 
        // fit 
        clip // 클립: 카메라의 근원과 원거리 평면을 설정함. 이를 통해서 view의 클립핑 영역을 설정하는 렌더링 영역을 제외할 수 있고, 성능 향상에 도움이 됨
        observe // window크기가 변경될 때마다 bound박스 크기를 다시 계산해서 변경해줌
        // onFit={onFit} // fit 맞춰졌을 때 작동
        // damping={1} // bounding box의 조절이나 애니메이션에 작용되는 부드러운 움직임.
        margin={0.7} // bounding box주변 마진
      >
        <FocusWeather>
        {
        content[0] && 
        content.map((e,i) => {
          const angle = (i / (content.length - 1)) * Math.PI
          const radius = 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <Fragment key={'weather' + i}>
              <Weather 
                position={[x, y - 1, 0]} 
                weather={e.weather[0].main.toLocaleLowerCase()} 
                rotation-y={i + 1} 
                cityName={e.name}
              />
            </Fragment>
          )
        })
        
        }
        </FocusWeather>
      </Bounds>
    </>
  )
}

