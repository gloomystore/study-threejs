import { useEffect, useState } from "react"

// vehicleAPI, chassisBodyApi
export default function useVehicleControls(vehicleApi, chassisBodyApi) {
  const [controls, setControls] = useState({})
  useEffect(()=>{
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({...controls, [e.key]: true}))
      console.log('down', e)
    }
    const keyUpPressHandler = (e) => {
      setControls((controls) => ({...controls, [e.key]: false}))
      console.log('up', e)
    }

    window.addEventListener('keydown', keyDownPressHandler)
    window.addEventListener('keyup', keyUpPressHandler)

    return () => {
      window.removeEventListener('keydown', keyDownPressHandler)
      window.removeEventListener('keyup', keyUpPressHandler)
    }
  }, [])

  useEffect(() => { 
    console.log(vehicleApi)
    if(controls.ArrowUp) {
      vehicleApi.applyEngineForce(120, 2) // 차체의 힘, 몇번째 인덱스의 바퀴를 사용할지
      vehicleApi.applyEngineForce(120, 3) // 2번, 3번 바퀴가 뒷바퀴라서 넣은거임
    } else if(controls.ArrowDown) {
      vehicleApi.applyEngineForce(-120, 2)
      vehicleApi.applyEngineForce(-120, 3)
    } 
    // else if(controls.Enter) { // 브레이크 기능
    //   vehicleApi.setBrake(1, 2) // 0이면 브레이크 완전 해체, 1은 브레이크 풀작동
    //   vehicleApi.setBrake(1, 2)
    // } 
    else {
      vehicleApi.applyEngineForce(0, 2)
      vehicleApi.applyEngineForce(0, 3)
    }

    if(controls.ArrowLeft) {
      vehicleApi.setSteeringValue(-0.1, 0)
      vehicleApi.setSteeringValue(-0.1, 1)
      vehicleApi.setSteeringValue(0.35, 2)
      vehicleApi.setSteeringValue(0.35, 3)
    } else if(controls.ArrowRight) {
      vehicleApi.setSteeringValue(0.1, 0)
      vehicleApi.setSteeringValue(0.1, 1)
      vehicleApi.setSteeringValue(-0.35, 2)
      vehicleApi.setSteeringValue(-0.35, 3)
    } else {
      // 모든 바퀴의 동력을 0으로 만들기
      for(let i = 0; i<4; i++) {
        vehicleApi.setSteeringValue(0,i)
      }
    }
    
  }, [controls, vehicleApi, chassisBodyApi])

  return controls
}
