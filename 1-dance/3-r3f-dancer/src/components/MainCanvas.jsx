import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Dancer from './Dancer'
import { Suspense } from 'react'
import Loader from './Loader'
import MovingDOM from '../dom/MovingDOM'
import { useRecoilValue } from 'recoil'
import { IsEnteredAtom } from '../stores'

export default function MainCanvas() {
  const isEntered = useRecoilValue(IsEnteredAtom)
  const aspectRatio = window.innerWidth / window.innerHeight
  return (
    <Canvas 
      id='canvas'
      gl={{antialias: true}}
      shadows='soft'
      camera={{
        fov:30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0,6,12]
      }}
      scene={{ background: new THREE.Color('#000')}}
    >

      {/* 스크롤컨트롤스: canvas앞에 DOM요소 배치해서 스크롤 이벤트 가능하게 함  */}
      <ScrollControls
        pages={isEntered ? 8 : 0}
        damping={0.25}
      >
        <Suspense fallback={<Loader />}>
          <MovingDOM />
          <Dancer />
        </Suspense>
      </ScrollControls>
    </Canvas>
  )
}