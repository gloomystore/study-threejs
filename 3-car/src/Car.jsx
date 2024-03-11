import { useControls } from "leva"
import DummyCarBody from "./dummy/DummyCarBody"
import { useBox, useCompoundBody, useRaycastVehicle } from '@react-three/cannon'
import { useMemo, useRef } from "react"
import DummyWheel from "./dummy/DummyWheel"
import useWheels from "./utils/useWheels"
import useVehicleControls from "./utils/useVehicleControls"
import { Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import useFollowCam from "./utils/useFollowCam"

export default function Car() {
  const { pivot } = useFollowCam()
  // 현재위치 추적
  const worldPosition = useMemo(()=> new Vector3(),[])
  function makeFollowCam(){
    chassisBodyRef?.current.getWorldPosition(worldPosition) // 차의 포지션을 매 프레임마다 업데이트 됨
    // console.log('worldPosition', worldPosition)
    pivot.position.lerp(worldPosition, 0.9) // lerp - 선형보간, 계수가 0에 가까울 수록 카메라 이동이 잘 안됨
  } 
  useFrame(() => {
    makeFollowCam()
  })

  const chassiBodyValue = useControls('chassiBody', {
    width: { value: 0.16, min: 0, max: 1 }, // 차체의 넓이 X
    height: { value: 0.12, min: 0, max: 1 }, // 차체의 높이 Y
    front: { value: 0.17 * 2, min: 0, max: 1 }, // 차체의 길이 Z
  })

  const position = [0, 0.5, 0]

  let width, height, front, mass, wheelRadius;

  width = 0.16
  height = 0.12
  front = 0.17
  mass = 150 
  wheelRadius = 0.05

  const chassiBodyArgs = [width, height, front * 2]

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

  const [chassisBodyRef, chassisBodyApi] = useCompoundBody(()=>({
    // args: chassiBodyArgs, // useBox에서 사용
    position,
    // rotation: [0,Math.PI,0],
    mass: 150,
    shapes: [ // useCompoundBody에서 사용
      {
        args: chassiBodyArgs, 
        position: [0,0,0],
        type: 'Box'
      },
      {
        args: [width, height, front],
        position: [0, height, 0],
        type: 'Box'
      }
    ]
  }), useRef(null))

  const [vehicleRef, vehicleApi] = useRaycastVehicle(()=>{
    return {
      chassisBody: chassisBodyRef,
      wheelInfos,
      wheels
    }
  })

  useVehicleControls(vehicleApi, chassisBodyApi)

  return (
    <group ref={vehicleRef}>
      {/* 차체 */}
      <group ref={chassisBodyRef}>
          {/* 차체 body */}
          <DummyCarBody {...chassiBodyValue} />
      </group>
      {/* 바퀴 */}
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  )
}
