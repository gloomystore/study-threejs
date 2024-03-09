import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export function Earth(props){
  const glb = useLoader(GLTFLoader, '/models/earth.glb') // gltf, obj, fbx 중 어떤 타입의 3d모델을 받아올지 정할 수 있음
  // console.log(glb)
  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  )
}