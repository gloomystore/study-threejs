import { useBox } from "@react-three/cannon"

export default function DummyBox(props) {
  const {args} = props
  const [ref, api] = useBox(()=>({
    args,
    mass: 5,
    // type: 'Dynamic',
    ...props
  }))


  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial color='blue' transparent opacity={0.5} />
    </mesh>
  )
}
