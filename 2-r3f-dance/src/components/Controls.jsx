import { FirstPersonControls, FlyControls, OrbitControls, PointerLockControls, TrackballControls } from '@react-three/drei';

export default function Controls() {
  return (
    <>
      <OrbitControls
        // enableDamping // default true
        // dampingFactor={0.03}
        // enableZoom // default true
        // enablePan // default true
        // // autoRotate // default false
        // // autoRotateSpeed={10}
        // maxPolarAngle={Math.PI / 2} // 수직 위
        // minPolarAngle={Math.PI / 4} // 수직 아래?

        // maxAzimuthAngle={Math.PI / 2} // 수평
        // minAzimuthAngle={-Math.PI / 2}
      />
      {/* <FlyControls
        movementSpeed={1}
        rollSpeed={Math.PI / 20}
        autoForward={true}
      /> */}
      {/* <FirstPersonControls
        lookSpeed={0.1}
        movementSpeed={1}
        lookVertical={false} // 마우스에 따라 수직 이동
      /> */}
      {/* <PointerLockControls /> */}
      {/* <TrackballControls
        rotateSpeed={2} //회전할때 스피드
        zoomSpeed={1.5} // 줌 스피드 (휠)
        panSpeed={0.5}  // 마우스 오른쪽 이동 스피드

        noRotate={false}
        noZoom={false}
        noPan={false}

        staticMoving={false} // 댐핑이 일어나지 않게 막기
        dynamicDampingFactor={0.2} // 댐핑하는 정도 - 숫자 작으면 댐핑 많이 일어남
      /> */}
    </>
  );
}
