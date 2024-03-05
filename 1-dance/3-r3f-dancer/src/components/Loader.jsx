import { useRecoilState } from "recoil"
import { IsEnteredAtom } from "../stores"
import { Html, useProgress } from "@react-three/drei"
import styled, { keyframes } from "styled-components"

export default function Loader({ isCompleted }) {
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom)
  const progress = useProgress()
  console.log('progress', progress)
  if(isEntered) return null
  else {return (
      <Html center> {/* 원래는 캔버스 하위에는 캔버스 요소만 들어가지만, HTML요소를 넣게 해줌 */}
        <BlurredBackground />
        <Container>
          <ProgressBar>
            {
              isCompleted ? 100 : progress.progress
            }%
          </ProgressBar>
          {
            progress.progress === 100 &&
            <EnterBtn onClick={()=>{
              setIsEntered(true)
            }}>
            Enter
            </EnterBtn>
          }
        </Container>
      </Html>
    )
  }
}

const blink = keyframes`
0% {
  opacity: 1;
}  
50% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter:  blur(300px);
`
const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`
const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`
const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 7px 18px 10px;
  background-color: transparent;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00
  }
`