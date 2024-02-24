import { Bloom, BrightnessContrast, DotScreen, EffectComposer, Glitch, Grid, HueSaturation, Pixelation, Sepia } from '@react-three/postprocessing'

export default function PostProcessor() {
  return (
    <>
    {/* normal pass라는걸 사용해서 렌더링 중간단계에서 시각적으로 자연스럽게함 - 간단하게, 걍 알록달록하게 만듦
    노말벡터 - 변에서 수직방향으로 나오는 벡터임
    */}
      <EffectComposer 
        disableNormalPass // 비활성화 
      >
        {/* Bloom - 빛이 우아하게 퍼짐  */}
        {/* <Bloom
          intensity={0.5}
          mipmapBlur // 3d 표면에 텍스쳐를 입힘
          luminanceThreshold={1} // 밝기가 1보다 높은 픽셀만 블룸 효과를 입히겠다
          luminanceSmoothing={0.02}
        />  */}

        {/* BrightnessContrast - 색상의 대조를 조절  */}
        {/* <BrightnessContrast
          brightness={-0.2} // 0 기준 작으면 어둡게, 크면 밝게
          contrast={0.8} // 대조
        /> */}

        {/* DotScreen - dot무늬 추가 */}
        {/* <DotScreen
          angle={Math.PI / 6} // angle 점 무늬의 방향 각
          scale={1} // 점 스크린의 크기
        /> */}

        {/* Glitch - 화면이 치지직거림*/}
        {/* <Glitch 
          delay={[1.5, 3.5]} // 지지직의 시간지연의 최소값과 최대값 - 1.5초에서 3.5초 사이로 랜덤시간동안 지연 시킴
          duration={[0.5, 1.0]} // 지지직의 유지시간의 최소값과 최대값 랜덤
          strength={[0.01, 1.0]} // 지지직 강도
          ratio={0.5} // 강한 강도의 glitch가 일어날 확률 - 50%, 높을수록 강한게 자주 일어남
        /> */}

        {/* Grid - 그리드 격자 모양*/}
        {/* <Grid
          scale={1} // 크면 잘게 쪼갬
          lineWidth={0.1} // 라인의 크기
        /> */}

        {/* HueSaturation - 색조, 채도 */}
        {/* <HueSaturation
          hue={Math.PI / 2} // 색조 - 채도 방향 돌리기
          saturation={0.4} // 채도
        /> */}

        {/* Pixelation - 픽셀화 - 모자이크 */}
        {/* <Pixelation
          granularity={10} // 모자이크 강도
        /> */}

        {/* Sepia - 세피아 색상 효과 */}
        <Sepia
         intensity={0.5}
        />
      </EffectComposer>
    </>
  )
}
