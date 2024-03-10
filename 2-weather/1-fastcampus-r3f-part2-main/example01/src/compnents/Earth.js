import { Html, Sparkles } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBodyClass } from '../utils/hook'

export function Earth(props){
  const glb = useLoader(GLTFLoader, '/models/earth.glb') // gltf, obj, fbx 중 어떤 타입의 3d모델을 받아올지 정할 수 있음
  // console.log(glb )
  useFrame((state, delta, xrFrame)=>{ //xrFrame은 가상현실에서만 쓰여서 웹에서는 쓰이지 않음. 자세한 구현방법은 나 스스로 연구해야함
    // state.camera.rotation.y -= delta * 0.1
    if(earthRef.current) earthRef.current.rotation.y += 0.1 * delta
  })
  const earthRef = useRef(null)

  const [isHover, setIsHover] = useState(false)

  // useEffect(()=>{
  //   if(isHover) document.body.classList.add('drag')
  //   else document.body.classList.remove('drag')
  //  return ()=>{
  //   document.body.classList.remove('drag')
  //  }
  // },[isHover])
  useBodyClass(isHover, 'drag')

  return (
    <group position={[0,-1.5,0]}>
      <Sparkles 
        count={80}
        position={[0,0,0]}
        size={5}
        scale={2.8}
        speed={0.4}
        // color={'#fff'}
      />
      <mesh 
        // onClick={(e) => console.log('클릭')}
        // onContextMenu={(e) => console.log('콘텍스트 메뉴, 오른쪽 마우스 클릭')}
        // onDoubleClick={(e) => console.log('더블 클릭')}
        // onWheel={(e) => console.log('마우스 휠')}
        // onPointerUp={(e) => console.log('마우스에서 손 뗐을 때(위로)')}
        // onPointerDown={(e) => console.log('마우스 버튼을 눌렀을 때(아래로)')}
        // onPointerOver={(e) => console.log('포인터가 객체 위에 올라감')}
        // onPointerOut={(e) => console.log('포인터가 객체를 벗어남')}
        // onPointerEnter={(e) => console.log('포인터가 객체 내로 들어가는 타이밍')}
        // onPointerLeave={(e) => console.log('포인터가 객체에서 벗어나는 타이밍')}
        // onPointerMove={(e) => console.log('포인터가 객체내에서 이동 중')}
        // onPointerMissed={() => console.log('포인터가 객체내에서 잃어버림')}
        // onUpdate={(self) => console.log('프로퍼티가 업데이트됨')}
      
        {...props} 
        onPointerEnter={()=>{setIsHover(true)}}
        onPointerLeave={()=>{setIsHover(false)}}
        ref={earthRef} scale={1.3} rotation-x={-Math.PI / 2} 
      >
        <primitive object={glb.scene} />
      </mesh>

      <Html 
        // fullscreen // 화면 덮음
        // center // 가운데로 
        // wrapperClass='h1-test' // 실제 Html이 렌더된 태그를 '둘러싼' 태그에 클래스 넣을 수 있음. 그냥 className 하면 얘 자체에 넣어버림
        // style={{color:'red'}}

        center
      >
        <span className='rotation-icon'>
          <img src='/icons/rotation.png' alt='icon' />
        </span>
      </Html>
    </group>
  )
}