import { useBox } from "@react-three/cannon"

export default function DummyWall(props) {
  const {args} = props
  const [ref, api] = useBox(()=>({
    args,
    type: 'Static',
    ...props
  }))


  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial color='#fff' transparent opacity={0.5} />
    </mesh>
  )
}
