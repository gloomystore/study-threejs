import { Box, Circle, Cone, Cylinder, Plane, Sphere, Torus, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

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
      <Box args={[1, 1, 1]} castShadow position-y={0.5}>
        <meshStandardMaterial 
          color='#ff0000' 
        />
      </Box>
      <Sphere args={[1]} position={[0,1,3]} material-color='#00ff00' />
      <Circle 
        args={[1]} 
        position={[0,1,-3]} 
        material-color='violet' 
        material-side={THREE.DoubleSide}
      />
      <Cone
        args={[1,2]}
        position={[3,1,3]}
        material-color='brown'
      />
      <Cylinder
        args={[1,2,3]} // radius top크기, radius bottom크기
        position={[3,1,-3]}
        material-color='pink'
      />
      <Torus
        args={[1, 0.2]} // radius top크기, radius bottom크기
        position={[-3,1.2,-3]}
        material-color='hotpink'
      />
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        material-color='teal'
        position={[-5, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={'#ff0000'}
          roughness={0.5}
          metalness={1}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        material-color='teal'
        position={[-9, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial
          color='#0abff0'
          emissive='#ff0000'
          emissiveIntensity={0.5}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        material-color='teal'
        position={[-13, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          color='#ff0000'
          emissive='#00ff00' // 뭔가 color 위에 덧칠해서 색칠하는 느낌. 자체 발광
          emissiveIntensity={0.5}
          specular='#0000ff'
          shininess={100}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        material-color='teal'
        position={[-16, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshDepthMaterial
          opacity={0.5}
        />
      </TorusKnot>
      
    </>
  )
}
