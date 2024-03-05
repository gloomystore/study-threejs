import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import TestMesh from './TestMesh'
import { Suspense, useCallback, useEffect, useState } from 'react'

export default function MainCanvas(props) {
  const [isLoad, setIsLoad] = useState(true)
  const handleModelLoaded = useCallback(()=>{
    setIsLoad(false)
  }, [])

  useEffect(()=>{
    const timeout = setTimeout(() => {
      handleModelLoaded();
      console.log('loaded!')
    }, 5000)
    return ()=>{
      clearTimeout(timeout)
    }
  },[])
  console.log('isLoad', isLoad)
  return (
    <Canvas
      gl={{antialias: true}}
      camera={{
        fov:60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [10,10,10],
      }}
      scene={{
        background: new THREE.Color('#000')
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100,100,100]} intensity={2} />
      <OrbitControls />
      <Suspense fallback={<Html>
        <div>로딩중...</div>
      </Html>}>
        {
          !isLoad &&  <TestMesh
            handleModelLoaded={handleModelLoaded} 
          />
        }
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload([
  '/models/dancer01.glb',
  '/models/dancer02.glb',
  '/models/dancer03.glb',
  '/models/dancer04.glb',
  '/models/dancer05.glb',
  '/models/dancer06.glb',
  '/models/dancer07.glb',
  '/models/dancer08.glb',
  '/models/dancer09.glb',
  '/models/dancer10.glb',
  '/models/dancer11.glb',
  '/models/dancer12.glb',
  '/models/dancer13.glb',
  '/models/dancer14.glb',
  '/models/dancer15.glb',
  '/models/dancer16.glb',
  '/models/dancer17.glb',
  '/models/dancer18.glb',
  '/models/dancer19.glb',
  '/models/dancer20.glb',
  '/models/dancer21.glb',
])