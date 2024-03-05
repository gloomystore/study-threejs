import MainCanvas from "./components/MainCanvas"
import styled from 'styled-components'
import { RecoilRoot } from 'recoil'
import FixedDOM from "./dom/FixedDOM"
function App() {

  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
        <FixedDOM />
      </Wrapper>
    </RecoilRoot>
  )
}
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export default App
