import { Merged } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'

export default function MergedMesh(props) {
  const three = useThree()
  const ref = useRef(null)
  console.log(three.scene.children)
  useFrame(()=> {
    ref.current.rotation.y += 0.01
  })
  return (
    // 메쉬들이 마치 각각이 아니라 하나인 것 처럼 그룹으로 합쳐버림
    <Merged
      ref={ref}
      position={[1,1,1]}
      meshes={[
        new THREE.Mesh(
          new THREE.BoxGeometry(1,1,1),
          new THREE.MeshStandardMaterial({color:'#ffff00'})
        ),
        new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshStandardMaterial({color:'#ff0000'})
        ),
      ]}
    >
      {
        (Box,Sphere) => {
          return (
          <>
            <Box position={[-1,-2,0]} />
            <Sphere position={[1,-1,0]} />
            <Box position={[-3,-3,0]} />
            <Box position={[-3,-5,0]} />
          </>)
        }
      }
    </Merged>
  )
}
