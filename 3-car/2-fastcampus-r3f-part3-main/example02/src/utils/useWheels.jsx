// width, height, front, radius 받음
// return [wheels, wheelInfos ]
import { useRef } from "react"
import { useCompoundBody } from '@react-three/cannon'

export default function useWheels(width, height, front, radius) {
  const wheels = [useRef(null),useRef(null),useRef(null),useRef(null),]
  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0], // 바퀴의 로컬 방향 벡터 (세계 좌표계 기준)
    axleLocal: [1, 0, 0], // 바퀴의 로컬 회전 축 벡터 (세계 좌표계 기준)
    suspensionStiffness: 25, // 서스펜션 강성 (낮을수록 부드럽고 높을수록 강하게)
    suspensionRestLength: 0.1,  // 서스펜션 초기 길이 (미터)
    frictionSlip: 5, // 마찰력
    dampingRelaxation: 1,
    dampingCompression: 1, // 댐핑 관련 매개변수 (낮을수록 진동이 심하게, 높을수록 안정적)
    maxSuspensionForce: 100000, // 최대 서스펜션 힘 (넘어지지 않도록 하는데 사용)
    rollInfluence: 0.01, // 차량의 기울기에 따른 바퀴의 롤링 영향 (낮을수록 안정적, 높을수록 미끄러움)
    maxSuspensionTravel: 0.3, // 최대 서스펜션 이동 거리 (미터)
    customSlidingRotationalSpeed: -30, // 사용자 정의 슬라이딩 회전 속도 (라디안/초, 음수 값은 반시계 방향 회전)
    useCustomSlidingRotationalSpeed: true, // 사용자 정의 슬라이딩 회전 속도 사용 여부
    sleepSpeedLimit: 0.01, // 슬립 상태에서 자동으로 차량을 꺼냄 (낮을수록 민감, 높을수록 허용)
  }
  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [ // 휠의 위치
        width * -0.65, height * 0.3, front,
      ]
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [ // 휠의 위치
        width * 0.65, height * 0.3, front,
      ]
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [ // 휠의 위치
        width * -0.65, height * 0.3, -front,
      ]
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [ // 휠의 위치
        width * 0.65, height * 0.3, -front,
      ]
    },
  ]

  const wheelFunc = () => {
    return {
      collisionFilterGroup: 0,
      mass: 50,
      shapes: [
        {
          args: [wheelInfo.radius, wheelInfo.radius, 0.025, 16],
          rotation: [0,0,-Math.PI/2],
          type: 'Cylinder',
        }
      ],
      onCollide: e => {
        console.log(e.collisionFilters)
      }
    }
  }

  useCompoundBody(wheelFunc, wheels[0])
  useCompoundBody(wheelFunc, wheels[1])
  useCompoundBody(wheelFunc, wheels[2])
  useCompoundBody(wheelFunc, wheels[3])

  return [wheels, wheelInfos]
}
