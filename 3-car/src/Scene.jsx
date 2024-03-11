import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Physics, Debug } from "@react-three/cannon";
import { useControls } from "leva"
import Car from "./Car";
import DummyMovementArea from "./dummy/DummyMovementArea";
import DummyBox from "./dummy/DummyBox";
import DummyBall from "./dummy/DummyBall";
import DummyWall from "./dummy/dummyWall";


function Scene() {

  return (
    <>
      <Canvas camera={{fov: 45, position: [1.5, 2, 5] }}>
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car/>
            {/* <DummyMovementArea position={[0, -0.2, 0]} /> */}
            <Ground rotation={[-Math.PI/2,0,0]}/>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
