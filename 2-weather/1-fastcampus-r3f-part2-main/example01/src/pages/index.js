import { Canvas } from "@react-three/fiber";
// import { Scene } from "../compnents/Scene";
import { Lights } from "../compnents/Lights";
import { Suspense, lazy } from "react";

function Sphere(){
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color={'white'} />
    </mesh>
  )
}

const Scene = lazy(()=>{
  return new Promise((res,rej) => {
    setTimeout(()=>{
      return res(import('../compnents/Scene'));
    },3000)
  })
})

export function Home(){
  return (
    
      <Canvas camera={{position: [0,1,3], fov: 45}}>
        <color 
          attach='background' 
          // args={[0,1,0]} // R,G,B
          args={['rgba(67, 127, 240, 100)']}
        />
        {/* <Box rotation-y={1} /> */}
        {/* <Box position={[0,0,-1.5]} rotation-y={1} /> */}
        <Suspense fallback={<Sphere />}>
          <Lights />
          <Scene />
        </Suspense>
      </Canvas>
  )
}





// function Box(props){
//   return (
//     <mesh {...props}>
//       <boxGeometry args={[1]} />
//       <meshStandardMaterial color='hotpink' wireframe />
//     </mesh>
//   )
// }
