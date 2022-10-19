import styled from "styled-components";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
`;

function Loading() {

  return (
    <Container>
      <LoadingIcon fill='transparent' />
    </Container>
  );
}

export default Loading;
