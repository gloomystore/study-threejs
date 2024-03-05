import { Box, Circle, Point, Points, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import gsap from 'gsap'
import Loader from "./Loader"
import * as THREE from 'three'

let tl; // timeline - 시간 경과에 따른 애니메이션 구현

export default function Dancer() {
  const isEntered = useRecoilValue(IsEnteredAtom)

  const three = useThree()

  const {scene, animations} = useGLTF('/models/dancer.glb')
  console.log('%c scene', 'color: lime', scene)
  console.log('%c animations', 'color: lime', animations)
  const dancerRef = useRef(null)

  const {actions} = useAnimations(animations, dancerRef)
  console.log('%c actions', 'color: lime', actions)

  useEffect(() => {
    if(!isEntered) return
    actions['wave'].play();
  }, [actions, isEntered])

  
  const scroll = useScroll()
  // console.log('%c scroll', 'color: lime', scroll)


  useFrame(()=>{
    // console.log('scroll.offset', scroll.offset)
    if(!isEntered) return
    tl.seek(scroll.offset * tl.duration())
  })

  useEffect(() => {
    if(!isEntered || !dancerRef.current) return
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5
      },
      {
        duration: 2.5 ,
        x: 0,
        y: 6,
        z: 12,
      }
    )
    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI
      },
      {
        duration: 2.5,
        z: 0
      }
    )
  }, [isEntered, three.camera.position, three.camera.rotation])

  useEffect(() => {
    if(!isEntered || !dancerRef.current) return
    tl = gsap.timeline()
    tl.from(
      dancerRef.current.rotation,
      {
        duration: 2.5,
        y: -4 * Math.PI
      }, 
      0.5
    ).from(
      dancerRef.current.position,
      {
        duration: 4,
        x: 3,
      },
      '<' // 앞서 선행하는 애니메이션을 상속받아서 동일하게 작동시킬 것이라는 의미
    ).to(
      three.camera.position,
      {
        duration: 10,
        x:2,
        z: 8
      },
      '<'
    ).to(
      three.camera.position,
      {
        duration: 10,
        x: 0,
        z: 6,
      }
    ).to(
      three.camera.position, // 뭘 이동시키겠다 - 여기서는 카메라 포지션을 이동시킬거임
      {
        duration: 10,
        x: 0,
        z: 16,
      }
    )
  }, [isEntered, three.camera.position])
  
  const texture = useTexture('/textures/5.png')
  const {positions} = useMemo(()=>{
    const count = 500
    const positions = new Float32Array(count * 3)
    for(let i = 0; i< count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25
      if(isNaN(positions[i])) console.error('positions[i]', positions[i])
    }
    return { positions }
  },[])

  // const points = ''
  

  if(isEntered) {
    return (
      <>
        <primitive 
          ref={dancerRef}
          object={scene}
          scale={0.05}
        />
        <ambientLight intensity={2} />
        <rectAreaLight
          position={[0,10,0]}
          intensity={30}
        />
        <pointLight
          position={[0,5,0]}
          intensity={45}
          castShadow
          receiveShadow
        />
        <hemisphereLight
          position={[0,5,0]}
          intensity={0}
          groundColor='lime'
          color='blue'
        /> 
        <Box 
          position={[0,0,0]}
          args={[100,100,100]} //큰 크기의 박스 - 우주
        >
          <meshStandardMaterial 
            color={'#dc4f00'}
            side={THREE.DoubleSide}
          />
        </Box>

        <Circle
         castShadow
         receiveShadow
         args={[8, 32]} // 반지름, 세그먼트
         rotation-x={-Math.PI / 2}
         position-y={-4.4}
        >
          <meshStandardMaterial 
            color={'#dc4f00'}
            side={THREE.DoubleSide}
          />  
        </Circle> 
        {/* <Points positions={positions.slice(0, positions.length / 3)}>
          <pointsMaterial
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation // 원근에 따라 크기를 조절하고 싶을 때
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice(positions.length / 3, positions.length * 2 / 3)}>
          <pointsMaterial
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation // 원근에 따라 크기를 조절하고 싶을 때
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice(positions.length * 2 / 3, positions.length)}>
          <pointsMaterial
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation // 원근에 따라 크기를 조절하고 싶을 때
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points> */}
      </>
    )
  } else {
    return (
      <Loader isCompleted />
    )
  }
}
