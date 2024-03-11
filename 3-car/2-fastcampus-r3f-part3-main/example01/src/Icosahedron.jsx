import { useConvexPolyhedron } from "@react-three/cannon"; // 볼록 다면체
import { useEffect, useMemo } from "react";
import { IcosahedronGeometry } from "three" // 20면체
import CannonUtils from './utils/CannonUtils'
export default function Icosahedron(props) {
  const geometry = useMemo(()=> new IcosahedronGeometry(0.5), []) // 20면체

  const args = useMemo(()=>{
    return CannonUtils.toConvexPolyhedronProps(geometry) 
  }, [])

  const [ref, api] = useConvexPolyhedron(() => { // cannon 중력장에서 작동하는 다각형으로 만들기
    return {
      args,
      mass: 1,
      ...props
    }
  })

  useEffect(()=> {
    console.log('geo', geometry)
    console.log('args', args)
  },[ref])
  return (
    <mesh ref={ref} geometry={geometry} onPointerDown={() => api.velocity.set(0,5,2)}>
      <meshBasicMaterial color={'orange'} />
    </mesh>
  )
}
