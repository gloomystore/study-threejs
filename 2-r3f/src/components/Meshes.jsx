import { useBox, useSphere } from '@react-three/cannon'
import { Box, Circle, Cone, Cylinder, Plane, Sphere, Torus, TorusKnot } from '@react-three/drei'
import { useEffect } from 'react'

export default function Meshes() {
  const [planeRef] = useBox(()=>{
    return {
      args:[50,1,50], // 크기
      type:'Static', // 물리적인 충돌이 일어나도 해당하는 ref를 받은 mesh는 움직이지 않음
      mass:1, // 질량
      position:[0,0,0],
      material: { // 특정 obj와 특정 obj가 충돌할 때, 따로 뭔가 설정하지 않으면 탄성력이 0.1, 마찰력이 1
        restitution: 1, // 탄성력
        friction: 0.5, // 마찰력
      },
      onCollide: () => {
        console.log('뭔가가 바닥에 충돌함!')
      }
    }
  })

  const [boxRef, api] = useBox(()=>{
    return {
      args:[1,1,1], // 크기
      mass:1,
      position:[-1,2,0],
      material: { // 캐논 매터리얼임. 특정 obj와 특정 obj가 충돌할 때, 따로 뭔가 설정하지 않으면 탄성력이 0.1, 마찰력이 1
        restitution: 0.4, // 탄성력
        friction: 0.2, // 마찰력
      },
    }
  })

  // applyForce: 힘을 지속적으로 동일한 힘으로 계속 줌
  // applyinForce: 힘을 팡 주고나서 더이상은 주지 않음

  // 이 둘은 로컬 좌표냐, 월드좌표냐에 따라 갈라짐
  const [shpereRef1, shpereAPI] = useSphere(()=>{
    return {
      mass:5,
      position:[0.5,8,0],
      material: { // 캐논 매터리얼임. 특정 obj와 특정 obj가 충돌할 때, 따로 뭔가 설정하지 않으면 탄성력이 0.1, 마찰력이 1
        restitution: 0.4, // 탄성력
        friction: 0.1, // 마찰력
      },
    }
  })
  const [shpereRef2] = useSphere(()=>{
    return {
      mass:0.2,
      position:[1,5,0],
      material: { // 캐논 매터리얼임. 특정 obj와 특정 obj가 충돌할 때, 따로 뭔가 설정하지 않으면 탄성력이 0.1, 마찰력이 1
        restitution: 0.2, // 탄성력
        friction: 0.1, // 마찰력
      },
    }
  })

  useEffect(()=>{
    api.applyForce([555,50,0],/* 힘이 진행하는 방향 */ [1,0,0] /* 1,0,0에서 왼쪽 555,50,0 으로 힘이 향함 */);
    shpereAPI.applyLocalForce([-2000, 0, 0], [1, 0, 0])
  }, [api, shpereAPI])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      api.applyLocalImpulse([0,20,0], [1,0,0])
      shpereAPI.applyImpulse([200,10,0], [0,0,0])
    },3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [api, shpereAPI])
  return (
    <>
      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'#ff0000'} />
      </mesh> */}

      {/* drei에서 제공하는 방법으로 위 코드를 쉽게 구현 가능 
        특히 이렇게 구현하면 buffer geometry를 사용하여 성능 이점이 있음
      */}
      {/* <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[3, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={'#ffff00'}
          roughness={0.2}
          metalness={0.5}
          emissive={'#ffff00'}
          emissiveIntensity={2}
        />
      </TorusKnot> */}

      {/* Plane대신 Box로 대체하는 이유는, 물리엔진을 사용할 때 두께가 없는걸 사용하면 표현 오류가 일어나는 경우가 있어서. */}
      <Box
        ref={planeRef}
        args={[50,1,50]}
      >
        <meshStandardMaterial 
          color='#fefefe'
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Box
        ref={boxRef}
        args={[1,1,1,]}
      >
          <meshStandardMaterial 
            color='#ff0000'
            roughness={0.3}
            metalness={0.8}
          />
      </Box>
      <Sphere
        ref={shpereRef1}
      >
        <meshStandardMaterial 
          color={'#9000ff'}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Sphere
        ref={shpereRef2}
      >
        <meshStandardMaterial 
          color={'#ff00ff'}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </>
  )
}
