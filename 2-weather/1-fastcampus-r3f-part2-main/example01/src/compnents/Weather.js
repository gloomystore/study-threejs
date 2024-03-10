import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { motion } from 'framer-motion-3d'
import { Html } from '@react-three/drei';
import CityName from './CityName';
import { useNavigate } from 'react-router-dom';
import { useBodyClass } from '../utils/hook';

export function Weather(props){
  const glb = useLoader(GLTFLoader, '/models/weather.glb') // gltf, obj, fbx 중 어떤 타입의 3d모델을 받아올지 정할 수 있음
  console.log(glb)
  const { position, weather, rotation, cityName } = props

  let weatherModel = useMemo(() => {
    return glb.nodes[weather] !== undefined ?
    glb.nodes[weather].clone()
    :
    glb.nodes.cloud.clone()
  }, [glb, weather]);

  const weatherRef = useRef(null)
  useFrame((state, delta)=>{
    if(weatherRef.current) weatherRef.current.rotation.y += delta
  })
  const [isHover, setIsHover] = useState(false)

  const navigate = useNavigate()

  const formattedCityName = useMemo(()=>{
    const regex = /(\s+)/g
    return cityName.replace(regex, '').toLocaleLowerCase()
  },[cityName])
  function goCity(){
    navigate(`/${formattedCityName}`, 
    // {state: {key: true}} //state도 보낼 수 있음
    )
  }

  useBodyClass(isHover, 'pointer')

  return (
    <group
      position={position} 
      rotation={rotation}
    >
      <motion.mesh 
        whileHover={{ scale:1.5, transition: {duration:3}}} 
        ref={weatherRef} 

        onClick={goCity}
        onPointerEnter={()=>{setIsHover(true)}}
        onPointerLeave={()=>{setIsHover(false)}}
      >
        <primitive 
          // object={glb.scene.children[0]} 
          object={weatherModel} 
        />
      </motion.mesh>
      { isHover && 
        <CityName
          name={cityName}
        />
      }
    </group>
  )
}