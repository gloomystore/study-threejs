import { useTrimesh } from "@react-three/cannon"
import { useEffect, useMemo } from "react"
import { TorusGeometry } from "three"

export default function Torus(props) {

  const geometry = useMemo(() => new TorusGeometry(0.5, 0.2, 16, 100),[])
  /*
  radius (Number): 도넛의 중심에서 가장자리까지의 반지름을 나타냅니다. 이는 도넛의 크기를 결정합니다.
  tube radius (Number): 도넛 튜브의 반지름을 나타냅니다. 튜브의 너비를 결정합니다.
  radial segments (Integer): 도넛을 구성하는 튜브의 세분화 수를 나타냅니다. 이 값이 높을수록 도넛이 더 부드럽게 보일 수 있습니다.
  tubular segments (Integer): 도넛을 구성하는 각 튜브의 세분화 수를 나타냅니다. 이 값이 높을수록 튜브가 더 부드럽게 보일 수 있습니다.
  */

  const [ref, api] = useTrimesh(()=>{
    return {
      args: [geometry.attributes.position.array, geometry.index.array],
      mass:1,
      rotation: [-Math.PI/2, 0, 0],
      ...props,
    }
  })

  useEffect(() => {
    console.log(geometry)
  },[geometry])
  return (
    <mesh ref={ref} geometry={geometry} onPointerDown={()=> api.velocity.set(0,2,1)}>
      <meshBasicMaterial color='orange' />
    </mesh>
  )
}
