import React from 'react'
import { usePlane } from "@react-three/cannon";
import DummyBox from './dummy/DummyBox';
import DummyWall from './dummy/dummyWall';
import DummyBall from './dummy/DummyBall';
import { Tree } from './components/Tree';
import { Ball } from './components/Ball';
import HowToPlay from './components/HowToPlay';

export function Ground(props) {

  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  )

  return (
    <group>
      <mesh
        {...props}
        ref={meshRef} 
        receiveShadow
        >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" opacity={0} transparent/>
      </mesh>

      <Tree position={[0, 0.5, -1]} />
      <Tree position={[-1, 0.5, -1]} />
      <Tree position={[3, 0.5, -1]} />
      <Tree position={[-3, 0.5, -1]} />

      <Ball position={[0,0.2,1]} />

      {/* <DummyBox position={[1,0.2,-2]} args={[0.2, 0.2, 0.2]} />
      <DummyBox position={[1,0.2,1]} args={[0.2, 0.5, 0.2]} type='Static' /> */}
      {/* <DummyBall position={[0,0.2,1]} args={[0.15]} /> */}
      <DummyWall position={[5, 0.5, 0]} args={[1,1,10]}  />
      <DummyWall position={[0, 0.5, 5]} args={[10,1,1]}  />
      <DummyWall position={[0, 0.5, -5]} args={[10,1,1]}  />
      <DummyWall position={[-5, 0.5, 0]} args={[1,1,10]}  />
      <HowToPlay />
    </group>
  )
}