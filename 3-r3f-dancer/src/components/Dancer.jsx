import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import gsap from 'gsap'
import Loader from "./Loader"

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
  }, [isEntered, three.camera.position])

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
  
  

  if(isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive 
          ref={dancerRef}
          object={scene}
          scale={0.05}
        />
      </>
    )
  } else {
    return (
      <Loader isCompleted />
    )
  }
}
