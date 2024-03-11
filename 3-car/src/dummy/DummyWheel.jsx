
export default function DummyWheel(props) {
  const {wheelRef, radius} = props
  return (
    <group ref={wheelRef}>
      <mesh rotation={[0,0,-Math.PI/2]}>
        <cylinderGeometry args={[radius, radius, 0.025, 16]} />{/* 하단 반지름, 상단반지름, 높이, 세그먼트*/}
        <meshNormalMaterial/>
      </mesh>
    </group>
  )
}
