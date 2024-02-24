import { SpotLight, useHelper } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
export default function Lights() {
  const directionalLightRef = useRef(null)
  const pointLightRef = useRef(null)
  const hemisphereLightRef = useRef(null)
  const spotLightRef = useRef(null)
  const SpotLightRef = useRef(null)
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper ,3, '#ffff00')
  // useHelper(pointLightRef, THREE.PointLightHelper ,1, '#ffff00')
  // useHelper(hemisphereLightRef, THREE.HemisphereLightHelper ,1, '#ffff00')
  useHelper(SpotLightRef, THREE.SpotLightHelper ,1, '#fff')

  const targetRef = useRef(null)
  const [target, setTarget] = useState()

  useEffect(() => {
    console.log('targetRef.current', targetRef.current)
    if(targetRef.current) {
      setTarget(targetRef.current)
      console.log('targetRef.current)', targetRef.current)
    }
  }, [targetRef])
  return (
    <>
      {/* <directionalLight
        ref={directionalLightRef}
        castShadow
        args={['#fff', 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={4096} // 그림자의 품질
        shadow-mapSize-height={4096} // 그림자의 품질
      /> */}
      {/* <ambientLight args={['#fff', 10]} /> */}
      {/* <pointLight
        ref={pointLightRef}
        args={['#fff', 10, 10, 1]} // 색, intensity
        position-y={2}
        castShadow
      /> */}
      {/* <hemisphereLight
        ref={hemisphereLightRef}
        args={['#0000ff', '#f00ff0', 5]} // sky color, ground color, intensity
        position-y={2}
      /> */}
      {/* <rectAreaLight
        args={['#fff', 5, 4, 4]} // 색, intensity, width, height
        position-y={1}
        rotation-x={-Math.PI / 2}
      /> */}
      {/* <spotLight
        ref={spotLightRef}
        args={['#fff', 10, 100, Math.PI / 4, 1, 0.5]} // 색, 강도, 거리, 각도, 페넘브라(경계선 부드럽게), 디케이(빛이 갈수록 희미해지는 정도)
        position={[3,3,3]}
      /> */}
      <SpotLight
        color='#fff'
        intensity={10}
        distance={100}
        angle={Math.PI / 4}
        penumbra={1}
        decay={0.5}
        anglePower={100} // 빛의 집중 정도
        attenuation={5} // 빛의 세기가 광원으로부터 멀어질수록 빨리 감소하는 정도
        radiusTop={1} // 조명 상단 반지름
        radiusBottom={100} // 조명 하단 반지름
        opacity={1} 
        volumetric // 최적 조명사용 여부 - 조명 사실적으로
        debug
        position={[3, 3, 3]}
        // target={target}
        ref={targetRef}
      />
    </>
  )
}
