import { useLoader } from "@react-three/fiber"
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export function Weather(props){
  const glb = useLoader(GLTFLoader, '/models/weather.glb') // gltf, obj, fbx 중 어떤 타입의 3d모델을 받아올지 정할 수 있음
  console.log(glb)
  const { position, weather } = props

  let weatherModel = useMemo(() => {
    return glb.nodes[weather] !== undefined ?
    glb.nodes[weather].clone()
    :
    glb.nodes.cloud.clone()
  }, [glb, weather]);

  return (
    <mesh position={position}>
      <primitive 
        // object={glb.scene.children[0]} 
        object={weatherModel} 
      />
    </mesh>
  )
}