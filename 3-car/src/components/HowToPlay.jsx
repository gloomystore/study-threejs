import { Text, Text3D } from "@react-three/drei";

export default function HowToPlay() {
  const fontUrl = '/assets/fonts/Pretendard.json'
  const fontStyle = {
    font:fontUrl,
    color:'#fff',
    size:0.15,
    letterSpacing:0.01,
    height:0.02,
    lineHeight:1,
    fontSize:1
  }

  return (
    <group position={[0.4,0,1.2]} rotation={[-Math.PI/2, 0,0]}>
      {/* <Text 
        font={fontUrl} 
        color={'#fff'}
        characters='abcdefghijklmnopqrstuvwxyz012345' // fallback폰트
      >
        hello world
      </Text> */}
      <Text3D 
        {...fontStyle}
        // bevelEnabled={true} // 두꺼운 입체 효과
        // bevelOffset={0.01}
        // bevelSize={0.001}
        // bevelThickness={0.1}
        characters='abcdefghijklmnopqrstuvwxyz012345' // fallback폰트
      >
        How To Play
        <meshNormalMaterial/>
      </Text3D>
      <group position={[0.3, -0.5, 0]}>
        <Text3D 
          {...fontStyle}
          position={[0.2, 0.1, 0]}
        >
          ↑
          <meshNormalMaterial/>
        </Text3D>
        <Text3D 
          {...fontStyle}
          position={[0, -0.1, 0]}
        >
          ←↓→
          <meshNormalMaterial/>
        </Text3D>
      </group>
    </group>
  )
}
