import { SpotLight, useHelper } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
export default function Lights() {
  const directionalLightRef = useRef(null)

  const targetRef = useRef(null)
  const [target, setTarget] = useState()

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        args={['#fff', 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25} // 작게하면 그림자가 짤림
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={4096} // 그림자의 품질
        shadow-mapSize-height={4096} // 그림자의 품질
      />
    </>
  )
}
