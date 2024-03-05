import { useGLTF } from '@react-three/drei'

export default function TestMesh(props) {
  const gltfs = useGLTF([
    '/models/dancer01.glb',
    '/models/dancer02.glb',
    '/models/dancer03.glb',
    '/models/dancer04.glb',
    '/models/dancer05.glb',
    '/models/dancer06.glb',
    '/models/dancer07.glb',
    '/models/dancer08.glb',
    '/models/dancer09.glb',
    '/models/dancer10.glb',
    '/models/dancer11.glb',
    '/models/dancer12.glb',
    '/models/dancer13.glb',
    '/models/dancer14.glb',
    '/models/dancer15.glb',
    '/models/dancer16.glb',
    '/models/dancer17.glb',
    '/models/dancer18.glb',
    '/models/dancer19.glb',
    '/models/dancer20.glb',
    '/models/dancer21.glb',
  ])
  console.log(gltfs)
  return (
    <>
      {
        gltfs.map((gltf, idx) => 
        <primitive 
          key={gltf.scene.uuid}
          object={gltf.scene}
          scale={0.1}
          rotation-y={(Math.PI / 5) * idx}
        />
        )
      }
    </>
  )
}