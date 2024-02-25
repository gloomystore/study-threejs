import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import { useRef } from "react"
import { Scroll, useScroll } from "@react-three/drei"
import styled from "styled-components"
import { useFrame } from "@react-three/fiber"



export default function MovingDOM() {
  const isEntered = useRecoilValue(IsEnteredAtom)
  const fixed = document.getElementById('fixed')
  const scroll = useScroll()
  const article01Ref = useRef(null)
  const article02Ref = useRef(null)
  const article03Ref = useRef(null)
  const article04Ref = useRef(null)
  const article05Ref = useRef(null)

  const refs = [article01Ref.current, article02Ref.current, article03Ref.current, article04Ref.current, article05Ref.current]
  useFrame(()=>{
    if(!isEntered || refs.find(e => e == undefined) || !fixed) return
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1/8)}`
    article02Ref.current.style.opacity = `${1 - scroll.range(1/8, 1/8)}`
    article03Ref.current.style.opacity = `${scroll.curve(2/8, 1/8)}`
    article04Ref.current.style.opacity = `${scroll.curve(3/8, 3/8)}`
    article05Ref.current.style.opacity = `${scroll.range(7/8, 1/8)}`

    if(scroll.visible(4/8, 3/8)) {
      fixed.style.display = 'flex'
      fixed.style.opacity = `${scroll.curve(4/8, 3/8)}`
    } else {
      fixed.style.display = 'none'
    }
  })

  if(!isEntered) return null
  return (
    <Scroll html> {/* 슬라이드를 먹는 스크롤이 만들어짐 */}
      <ArticleWrapper ref={article01Ref}>
        <LeftBox>
          <span>1-첫 번째 텍스트</span>
          <span>1-두 번째 텍스트</span>
          <span>1-세 번째 텍스트</span>
          <span>1-네 번째 텍스트</span>
          <span>1-다섯 번째 텍스트</span>
        </LeftBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <span>2-첫 번째 텍스트</span>
          <span>2-두 번째 텍스트</span>
          <span>2-세 번째 텍스트</span>
          <span>2-네 번째 텍스트</span>
          <span>2-다섯 번째 텍스트</span>
        </RightBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article03Ref}>
        3-Threejs D3F Drei Cannon
      </ArticleWrapper>

      <ArticleWrapper className='height-4' ref={article04Ref}>
        <RightBox>
          <span>4-첫 번째 텍스트</span>
          <span>4-두 번째 텍스트</span>
          <span>4-세 번째 텍스트</span>
          <span>4-네 번째 텍스트</span>
          <span>4-다섯 번째 텍스트</span>
        </RightBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article05Ref}>
        on the footer
        <Footer>
          in the footer1
          in the footer2
          in the footer3
          in the footer4
        </Footer>
      </ArticleWrapper>
    </Scroll>
  )
}

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  &.height-4 {
    height: 400vh;
  }
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  padding: 40px;
`
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
  }
  & > span:nth-of-type(2) {
    font-size: 48px;
  }
  & > span:nth-of-type(3) {
    font-size: 16px;
  }
  & > span:nth-of-type(4) {
    font-size: 24px;
  }
  & > span:nth-of-type(5) {
    font-size: 28px;
  }
`
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
  }
  & > span:nth-of-type(2) {
    font-size: 48px;
  }
  & > span:nth-of-type(3) {
    font-size: 16px;
  }
  & > span:nth-of-type(4) {
    font-size: 24px;
  }
  & > span:nth-of-type(5) {
    font-size: 28px;
  }
`
const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 8px;
`