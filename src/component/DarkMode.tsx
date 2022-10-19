import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../etc/atoms";
import { BiAdjust } from "react-icons/bi";

const Container = styled.div<{ shadow: boolean }>`
  position: fixed;
  right: 35px;
  bottom: 35px;
  width: 50px;
  height: 50px;
  z-index: 111;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.3ms;
  box-shadow: ${props => (props.shadow ? "0 0 10px rgba(255,255,255,1)" : "0 0 10px rgba(0,0,0,1)")};
  cursor: pointer;
  svg {
    font-size: 32px;
    color: ${props => props.theme.textColor};
  }
`;

function DarkMode() {
  const [darkmode, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleAtom = () => setDarkAtom(prev => !prev);

  return (
    <Container onClick={toggleAtom} shadow={darkmode}>
      <BiAdjust />
    </Container>
  );
}

export default DarkMode;
