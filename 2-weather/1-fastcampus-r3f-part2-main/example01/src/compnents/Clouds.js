import { Cloud } from "@react-three/drei";

export default function Clouds() {
  return (
    <group position={[0, -5, 0]}>
      <Cloud 
        position-x={-5}
        opacity={0.4}
        speed={0.4}
        width={0.1} // 가로
        depth={0.2} // 사실상 세로
        segments={3}
        color='#fff'
      />  
      <Cloud 
        position-x={5}
        opacity={0.4}
        speed={0.4}
        width={0.1} // 가로
        depth={0.2} // 사실상 세로
        segments={3}
        color='#fff'
      />  
    </group>
  )
}
