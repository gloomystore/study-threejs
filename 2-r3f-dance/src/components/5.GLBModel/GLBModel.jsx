import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export default function GLBModel() {
  const gltf = useGLTF('/dancer.glb');
  console.warn('%c gltf', 'color: lime', gltf);
  const { scene, animations } = gltf;
  const primitiveRef = useRef(null)

  const anime = useAnimations(animations, primitiveRef)
  console.log('anime', anime)
  const { actions } = anime

  useEffect(() => {
    scene.traverse(obj => {
      if(obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })

    actions.wave.play()
  }, [scene])

  useFrame((state, delta) => {
    // state에는 rayCaster나 gl이라는 렌더러, 카메라 등 많은 정보가 들어있음
    // console.log('state', state)
    // console.log('delta', delta)
    primitiveRef.current.rotation.y += 0.01
  })
  // const three = useThree() // useFrame((state))의 state를 여기서 들고올 수 있음
  // console.warn('%c three', 'color: lime', three)

  
  return (
    <>
      <primitive 
        object={scene} 
        scale={0.01} 
        position={[0, 0.8, 0]} 
        ref={primitiveRef}
      />
    </>
  );
}
