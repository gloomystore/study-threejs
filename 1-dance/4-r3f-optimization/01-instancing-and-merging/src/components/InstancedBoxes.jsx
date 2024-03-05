import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three'

// 개별 인스턴스드 메쉬의 회전 및 위치값 계산을 위해 사용할 임시 Object3D 
const object3D = new THREE.Object3D();
const color = new THREE.Color();
const boxCount = 1000000
const boxSize = [0.2, 0.2, 0.2];

const colorPalettes = ['#00a0b0', '#6a4a3c', '#cc333f', '#eb6841', '#edc951']

export default function InstancedBoxed(props) {
  const ref = useRef(null)
  const colors = useMemo(() => {
    return new Float32Array(
      Array.from({length: boxCount}, () => {
        return color.set(colorPalettes[Math.floor(Math.random() * 5)]).toArray()
      }).flat()
    )
  }, [])

  useEffect(()=>{
    let i = 0
    // 박스메쉬가 들어갈 공간의 한 차원의 길이가 spacewidth임
    const spaceWidth = Math.pow(boxCount, 1/3)
    const harfOfSpaceWidth = spaceWidth / 2;

    for(let x = 0; x < spaceWidth; x++) {
      for(let y = 0; y < spaceWidth; y++) {
        for(let z = 0; z < spaceWidth; z++) {
          const id = i++
          object3D.rotation.set(Math.random(), Math.random(), Math.random())
          object3D.position.set(
            harfOfSpaceWidth - x + Math.random(),
            harfOfSpaceWidth - y + Math.random(),
            harfOfSpaceWidth - z + Math.random(),
          )
          object3D.updateMatrix()
          ref.current.setMatrixAt(id, object3D.matrix)
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true
  },[])
  return (
    <instancedMesh
      ref={ref}
      args={[null, null, boxCount]}
    >
      <boxGeometry args={boxSize}>
        {/*  */}
        <instancedBufferAttribute 
          attach={'attributes-color'}
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshLambertMaterial
        vertexColors
      />
    </instancedMesh>
  )
}
