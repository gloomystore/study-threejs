import { Canvas } from '@react-three/fiber'
import { Color } from 'three'
import Meshes from './Meshes'
import Lights from './Lights'
import Controls from './Controls'
import GLBModel from './GLBModel'
import { Dancer } from './Dancer'
import PostProcessor from './PostProcessor'
import { Physics } from '@react-three/cannon'

export default function MainCanvas() {
  return (
    <>
      <Canvas
        gl={{ antialias: true }}
        // 아래 네 개는 동일
        shadows={'soft'}
        // shadows
        // shadows={true}
        // shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}

        camera={{
          fov: 60,
          aspect: window.innerWidth / window.innerHeight, //카메라의 비율
          near: 0.1,
          far: 100,
          position: [5, 5, 5],
        }}
        scene={{ background: new Color('#000') }}
      >
        <Physics>
          <Controls />
          <Lights />
          <Meshes />
        </Physics>
        {/* <PostProcessor /> */}
        {/* <GLBModel /> */}
        {/* <Dancer /> */}
      </Canvas>
    </>
  )
}
