import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { Ground } from "./Ground";
import { Debug, Physics } from '@react-three/cannon'
import { useControls } from 'leva'

function Scene() {
  const bgValue = useControls({bgColor: '#fff'})
  const gravity = useControls('Gravity', {
    x: { value: 0, min: -10, max: 10, step: 0.1}, // min max step 넣으면 조절 바가 생김
    y: { value: -9.81, min: -10, max: 10, step: 0.1},
    z: { value: 0, min: -10, max: 10, step: 0.1},
  })
  return (
    <>
      <Canvas camera={{ position: [0, 2, 4] }}>
        <color attach={'background'} args={[bgValue.bgColor]} />
        <Physics gravity={[gravity.x, gravity.y, gravity.z]}>{/* m/s 단위인듯? */}
          <Debug>
            <ambientLight/>
            <directionalLight position={[0, 5, 5]} />
            <Box position={[0,1,0]}/>
            <Ground rotation={[-Math.PI/2,0,0]}/>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
