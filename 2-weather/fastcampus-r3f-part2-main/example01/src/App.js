import { Canvas } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

function App() {
  return (
    <Canvas camera={{position: [0,1,2]}}>
      <color 
        attach='background' 
        // args={[0,1,0]} // R,G,B
        args={['yellow']}
      />
      <Lights />
      <Box rotation-y={1} />
      <Box position={[0,0,-1.5]} rotation-y={1} />
    </Canvas>
  );
}

function Box(props){
  return (
    <mesh {...props}>
      <boxGeometry args={[1]} />
      <meshStandardMaterial color='hotpink' wireframe />
    </mesh>
  )
}

function Lights(){
  const lightRef = useRef()
  useHelper(lightRef, DirectionalLightHelper, 1 ,'red')
  return (
    <>
      <directionalLight
        position={[1,3,-1]}
        intensity={3}
        ref={lightRef}
      />
    </>
  )
}

export default App;
