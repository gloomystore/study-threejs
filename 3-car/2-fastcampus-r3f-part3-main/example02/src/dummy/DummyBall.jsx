import { useSphere } from "@react-three/cannon"

export default function DummyBall(props) {
  const {args} = props
  const [ref, api] = useSphere(()=>({
    args,
    mass: 1,
    // type: 'Dynamic', // default: Dynamic
    ...props
  }))

  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshBasicMaterial color='orange' transparent opacity={0.5} />
    </mesh>
  )
}
