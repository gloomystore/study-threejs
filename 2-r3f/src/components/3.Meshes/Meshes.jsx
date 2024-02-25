import { Box, Circle, Cone, Cylinder, Plane, Sphere, Torus, TorusKnot } from '@react-three/drei'

export default function Meshes() {
  return (
    <>
      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'#ff0000'} />
      </mesh> */}

      {/* drei에서 제공하는 방법으로 위 코드를 쉽게 구현 가능 
        특히 이렇게 구현하면 buffer geometry를 사용하여 성능 이점이 있음
      */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-10, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={'#ff0000'}
          // roughness={0.5}
          // metalness={1}
        />
      </TorusKnot>
    </>
  )
}
