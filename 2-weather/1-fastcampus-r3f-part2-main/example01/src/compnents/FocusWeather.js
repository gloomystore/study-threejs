import { useBounds } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function FocusWeather({children}) {
  const bounds = useBounds()
  const meshRef = useRef(null)
  // useEffect(() => {
  //   console.log('bounds', bounds.getSize())
  //   /*
  //     bounds.getSize() - 박스의 사이즈를 가져옴
  //     bounds.clip() - Bounds 컴포넌트의 fit과 clip과 같다
  //     bounds.fit()
  //     bounds.refresh() - 인자로 3d객체를 받음. bounds box가 최신으로 유지됨
  //   */
  //  bounds.refresh(meshRef.current).clip().fit()
  // }, [bounds])
  
  const location = useLocation()
  useEffect(() => {
    if(location.pathname === '/') {
      bounds.refresh().fit()
    }
  }, [location])

  function onClick(e){
    console.log(e.object)
    e.stopPropagation()
    bounds.refresh(e.object).clip().fit()
  }

  function onPointerMissed(e){
    if(e.button === 0) bounds.refresh().fit()
  }

  return (
    <group 
      onClick={onClick}
      onPointerMissed={onPointerMissed}
    >
      {children}
      {/* <mesh ref={meshRef}>
        <torusGeometry args={[1,0.5,16,100]} />
        <meshBasicMaterial color={'green'} />  
      </mesh> */}
    </group>
  )
}
