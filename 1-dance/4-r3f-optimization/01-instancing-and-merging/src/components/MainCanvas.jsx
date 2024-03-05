import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import InstancedBoxes from './InstancedBoxes'
import MergedMesh from './MergedMesh'

export default function MainCanvas(props) {
  return (
    <Canvas
      gl={{antialias: true}}
      camera={{
        fov:60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [5,5,5],
      }}
      scene={{
        background: new THREE.Color('#000')
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100,100,100]} intensity={2} />
      <OrbitControls />
      {/* <InstancedBoxes /> */}

      {/* 메쉬들이 마치 각각이 아니라 하나인 것 처럼 그룹으로 합쳐버림 */}
      <MergedMesh />
    </Canvas>
  )
}
