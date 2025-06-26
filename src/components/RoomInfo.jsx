import styled from "styled-components";
import RoomGraphics from "./RoomGraphics";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    margin-top: 20px;
  `
  


export default function RoomInfo({room}) {
  return (
    <Wrapper>
      <RoomGraphics room={room}></RoomGraphics>
    </Wrapper>
  );
}