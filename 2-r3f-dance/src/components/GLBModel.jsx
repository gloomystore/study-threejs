import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

export default function GLBModel() {
  const gltf = useGLTF('/dancer.glb');
  console.warn('%c gltf', 'color: lime', gltf)
  const primitiveRef = useRef(null)
  const { scene, animations } = gltf

  // 현재 동작 액션
  const [currentAnimation, setCurrentAnimation] = useState('wave')

  const anime = useAnimations(animations, primitiveRef)
  console.log('anime', anime)
  const { actions } = anime
  console.log('actions', actions)
  useEffect(() => {
    scene.traverse(obj => {
      if(obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  // 애니메이션 액션이 바뀌면 페이드 동작으로 부드럽게 넣어줌
  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play()
    return (() => {
      actions[currentAnimation].fadeOut(0.5).stop()
    })
  }, [actions, currentAnimation])

  
  return (
    <>
      <primitive 
        object={scene} 
        scale={0.01} 
        position={[0, 0.8, 0]} 
        ref={primitiveRef}

        onClick={() => {
          setCurrentAnimation(prev => {
            if(prev === 'wave') return 'windmill'
            else return 'wave'
          })
        }}
        onPointerUp={() => {
          console.log('업')
        }}
        onPointerDown={() => {
          console.log('다운')
        }}
      />
    </>
  );
}
