import { useRef } from 'react'
import { Environment } from '@react-three/drei'

export function Lights(){
  const lightRef = useRef()
  // useHelper(lightRef, DirectionalLightHelper, 1 ,'red')
  return (
    <>
      <directionalLight
        position={[1,3,-1]}
        intensity={3}
        ref={lightRef}
      />
      <ambientLight
        intensity={1}
        color={'#fff'}
      /> 
      <Environment preset='forest' />
    </>
  )
}
