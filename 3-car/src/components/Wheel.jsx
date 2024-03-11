import { useEffect } from "react"


export default function Wheel({nodes, materials, wheelRef, radius, leftSide}) {
  useEffect(()=>{
    console.log(radius)
  },[radius])
  return (
    <group ref={wheelRef}>
      <group rotation={[0, leftSide ? -Math.PI : 0, 0]}>
        <mesh geometry={nodes.Car01_2_WhFL002_0.geometry} material={materials.mt_PalleteBR} rotation={[-1.576, 0, 0]} scale={radius * 3} />
      </group>
    </group>
  )
}
