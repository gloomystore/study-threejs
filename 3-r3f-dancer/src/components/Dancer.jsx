import { Box, Circle, Point, Points, PositionalAudio, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from '../stores'
import gsap from 'gsap'
import Loader from "./Loader"
import * as THREE from 'three'

let tl; // timeline - 시간 경과에 따른 애니메이션 구현
const colors = {
  boxMaterialColor: '#dc4f00'
}
export default function Dancer() {

  const isEntered = useRecoilValue(IsEnteredAtom)

  const three = useThree()

  const {scene, animations} = useGLTF('/models/dancer.glb')
  console.log('%c scene', 'color: lime', scene)
  console.log('%c animations', 'color: lime', animations)
  const dancerRef = useRef(null)
  const boxRef = useRef(null)
  const starGroupRef01 = useRef(null)
  const starGroupRef02 = useRef(null)
  const starGroupRef03 = useRef(null)
  const rectAreaLightRef = useRef(null)
  const hemisphereLightRef = useRef(null)

  const {actions} = useAnimations(animations, dancerRef)
  console.log('%c actions', 'color: lime', actions)

  const [currentAnimation, setCurrentAnimation] = useState('wave')
  const [rotateFinished, setRotateFinished] = useState(false)

  const scroll = useScroll()
  // console.log('%c scroll', 'color: lime', scroll)


  useFrame(()=>{
    // console.log('scroll.offset', scroll.offset)
    if(!isEntered || !boxRef.current) return
    tl.seek(scroll.offset * tl.duration())
    boxRef.current.material.color = new THREE.Color(colors.boxMaterialColor)
    if(rotateFinished) {
      setCurrentAnimation('breakdancingEnd')
    } else {
      setCurrentAnimation('wave')
    }
  })

  // 입장했을 때
  useEffect(() => {
    if(!isEntered) return
    three.camera.lookAt(1,2,0)
    actions['wave'].play();
    three.scene.background = new THREE.Color(colors.boxMaterialColor)
    scene.traverse(obj => {
      obj.castShadow = true
      obj.receiveShadow = true
    })
  }, [actions, isEntered, three.camera, three.scene, scene])

  // 춤추는 애니메이션 동작
  useEffect(()=>{
    let timeout;
    if(currentAnimation === 'wave') {
      actions[currentAnimation]?.reset().fadeIn(0.5).play()
    } else {
      actions[currentAnimation]?.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce, 1)
      timeout = setTimeout(()=>{
        if(actions[currentAnimation]) {
          actions[currentAnimation].paused = true
        }
      }, 8000)
    }
    return ()=>{
      clearTimeout(timeout)
      actions[currentAnimation]?.reset().fadeOut(0.5).stop()
    }
  }, [actions, currentAnimation])


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

    // 별이 지속적으로 반짝이는 애니메이션
    gsap.fromTo(
      colors,
      {
        boxMaterialColor: '#0c0400'
      },
      {
        duration: 2.5,
        boxMaterialColor:'#dc4f00'
      }
    )
    gsap.to(
      starGroupRef01.current,
      {
        yoyo: true, // 역재생 가능
        duration: 2,
        repeat: -1, // -1 : 무한히 반복
        ease: 'linear',
        size: 0.05
      },
    )
    gsap.to(
      starGroupRef02.current,
      {
        yoyo: true,
        duration: 3,
        repeat: -1,
        ease: 'linear',
        size: 0.05
      },
    )
    gsap.to(
      starGroupRef03.current,
      {
        yoyo: true,
        duration: 4,
        repeat: -1,
        ease: 'linear',
        size: 0.05
      },
    )
  }, [isEntered, three.camera.position, three.camera.rotation])

  const texture = useTexture('/textures/5.png')
  console.log('%c texture', 'color: red', texture)
  const {positions} = useMemo(()=>{
    const count = 500
    const positions = new Float32Array(count * 3)
    for(let i = 0; i< count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25
    }
    return { positions }
  }, [])


  // 타임라인
  useEffect(() => {
    if(!isEntered || !dancerRef.current) return

    const pivot = new THREE.Group() // 피벗: 카메라의 공전을 원할 때
    pivot.position.copy(dancerRef.current.position)
    pivot.add(three.camera)
    three.scene.add(pivot)

    tl = gsap.timeline()
    tl.from(
      dancerRef.current.rotation,
      {
        duration: 2.5,
        y: Math.PI
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
    )
    
    .to(colors,
      {
        duration: 10,
        boxMaterialColor: '#0c0400',
      }  ,
      '<'
    )
    .to(pivot.rotation,
      {
        duration: 10,
        y: Math.PI,
      }  ,
      '<'
    )
    .to(
      three.camera.position,
      {
        duration: 10,
        x: -4,
        z: 12,
      },
      '<'
    )
    
    .to(
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
        onUpdate: ()=>{
          setRotateFinished(false)
        }
      }
    )
    .to(
      hemisphereLightRef.current,
      {
        duration: 5,
        intensity: 30,
      }
    )
    .to(
      pivot.rotation,
      {
        duration: 15,
        y: Math.PI * 4,
        onUpdate: ()=>{
          setRotateFinished(true)
        }
      },
      '<'
    )
    .to(colors, 
      {
        duration: 15,
        boxMaterialColor: '#dc4f00'
      }
    )
    return () => {
      three.scene.remove(pivot)
    }
  }, [isEntered, three.camera.position, three.camera])
  
  if(isEntered && texture) {
    return (
      <>
        <primitive 
          ref={dancerRef}
          object={scene}
          scale={0.05}
        />
        <ambientLight intensity={2} />
        <rectAreaLight
        ref={rectAreaLightRef}
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
        ref={hemisphereLightRef}
          position={[0,5,0]}
          intensity={0}
          groundColor='lime'
          color='blue'
        /> 
        <Box 
          ref={boxRef}
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
        <Points positions={positions.slice(0, positions.length / 3)}>
          <pointsMaterial
            ref={starGroupRef01}
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
          ref={starGroupRef02}
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
            ref={starGroupRef03}
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation // 원근에 따라 크기를 조절하고 싶을 때
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <PositionalAudio
          position={[-24,0,0]} // 오디오의 좌표로 입체감 형성 가능
          autoplay
          url='/audio/bgm2.mp3'
          distance={50}
          loop
        /> 
      </>
    )
  } else {
    return (
      <Loader isCompleted />
    )
  }
}
