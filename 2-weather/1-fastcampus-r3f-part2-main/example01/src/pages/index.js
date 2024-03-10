import { Canvas } from '@react-three/fiber';
// import { Scene } from '../compnents/Scene';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion-3d'
import { Lights } from '../compnents/Lights';
import { OrbitControls, Loader } from '@react-three/drei';
import { Vector3 } from 'three';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedOutlet from '../compnents/AnimatedOutlet';

const variants = {
  initial: {
    rotateX: Math.PI/2, rotateZ: 1
  },
  animate1: {
    rotateZ: [0, Math.PI], transition: {
      duration: 3, repeat: Infinity,
    }
  },
  animate2: {
    rotateY: [Math.PI, 0], transition: {
      duration: 3, repeat: Infinity,
    }
  }
}

function FramerModel(){
  return (
    <motion.mesh 
      // initial={{rotateX: Math.PI/2, rotateZ: 1 }}
      // // animate={{rotateX: Math.PI/2, rotateZ: 1 }}
      // animate={{rotateZ:[0, Math.PI], scale:[1, 1.5, 1] }}
      // transition={{duration:3, repeat:Infinity}}
      variants={variants}
      initial='initial'
      animate='animate2'
    >
      <cylinderGeometry
        args={[1,1,0.5,8]} // 반지름, 반지름, 높이, 세그먼트
      /> 
      <motion.meshBasicMaterial
        color={'hotpink'}
      />
    </motion.mesh>
  )
}


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
  const pivot = new Vector3(0,2,0)
  const location = useLocation()
  return (
      <>
        <Canvas camera={{position: [0,0,5], fov: 45}}>
          {/* <color 
            attach='background' 
            // args={[0,1,0]} // R,G,B
            args={['rgba(67, 127, 240, 100)']}
          /> */}
          {/* <Box rotation-y={1} /> */}
          {/* <Box position={[0,0,-1.5]} rotation-y={1} /> */}
          <Suspense fallback={null}>
            {/* <Lights /> */}
            <Scene />
            {/* <FramerModel rotation={[Math.PI/2, 0, 1]} /> */}
            {/* <FramerModel /> */}
          </Suspense>
          <OrbitControls 
            // enabled={false} // 카메라 동작 끄기
            // enableZoom={false} // 줌기능
            // zoomSpeed={4} // 줌속도
            // minZoom={2} // 줌 가능 거리 - Canvas태그에 orthographic이 있어야 작동함
            // maxZoom={5}

            // enablePan={false} // 패닝
            // panSpeed={4} // 패닝 속도
            // screenSpacePanning={false} // 세로 패닝을 막아버림

            // enableRotate={false} // 회전 막기
            // rotateSpeed={2} // default:1
            // minAzimuthAngle={0} // 수평 각도 제한
            // maxAzimuthAngle={Math.PI}
            // minPolarAngle={0} // 수직 각도 제한
            // maxPolarAngle={Math.PI/2}
            // autoRotate={true}
            // autoRotateSpeed={2} // default:2

            // enableDamping={true} // dampingFactor와 함께 댐퍼 효과 세트
            // dampingFactor={0.01}

            // target={pivot} // 카메라가 도는 중심점. 카메라의 중심 그자체가 타겟이 됨
            
            // minDistance={2}
            // maxDistance={8}
            // makeDefault // drei의 OrbitControls는 이미 적용되어있음

            makeDefault
            enablePan={false}
            minDistance={2}
            maxDistance={15}
            minAzimuthAngle={-Math.PI/4}
            maxAzimuthAngle={Math.PI/4}
            minPolarAngle={Math.PI/6}
            maxPolarAngle={Math.PI/6 * 5}


          />
        </Canvas>
        <Loader />

        {/* React 트리에서 직접적인 자식들이 제거될 때 이를 감지하여 작동,
        각 자식에게 고유한 key를 부여해 주어야 함
        */}
        <AnimatePresence>
          {/* <Outlet key={location.pathname} /> */}
          <AnimatedOutlet key={location.pathname} />
        </AnimatePresence>
      </>
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
