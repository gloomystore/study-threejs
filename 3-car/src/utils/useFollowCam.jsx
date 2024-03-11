import { useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { CameraHelper, Object3D } from "three"

export default function useFollowCam() {
  const { camera, scene } = useThree() // useThree는 무조건 canvas안에서 사용해야함. 카메라의 상태나 마우스 상태 등등...
  const pivot = useMemo(() => new Object3D(), [])

  console.log(camera)
  console.log(scene)

  function makeCamera(){
    camera.position.set(1, 2, 3.5)
    camera.rotation.x = -0.5
    
    pivot.add(camera)
    // const helper = new CameraHelper(camera)
    // scene.add(helper)
    scene.add(pivot)
  }

  useEffect(()=>{
    makeCamera()
  }, [])

  return {pivot}
}
