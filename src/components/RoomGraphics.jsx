import styled from "styled-components";

const Wrap = styled.div`
  border: 1px solid lightblue;
  background-color: grey;
  width: 500px;
  height: ${(props) => {500 * props.height / props.width}}px;height: ${(props) => `${500 * props.height / props.width}px`};
  display: flex;
  justify-content: center;

  position: relative;
  display: inline-block;
`;

const RoomObject = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10%;
  background-color: transparent;
  border: 2px solid;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const QRObject = styled(RoomObject)`
  border-color: red;
  &::before {
    content: "Q";
    color: red;
    font-size: 12px;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }
`;
const ACObject = styled(RoomObject)`
  border-color: blue;
  &::before {
    content: "A";
    color: blue;
    font-size: 12px;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }
`;


export default function RoomGraphics({room}) {
  let idx = 0;
  console.log(room.height);
  console.log(room.width);
  return (
    <Wrap height={room.height} width={room.width}>
      {room['aircons'].map((aircon) => (
        <ACObject key={idx++}
          style={{ left: `${500 * (aircon.posX / room.width)}px`, top: `${500 * (room.height / room.width) * (aircon.posY / room.height)}px`}}
        />
      ))}
      {room['qrs'].map((qr) => (
        <QRObject key={idx++}
          style={{ left: `${500 * (qr.posX / room.width)}px`, top: `${500 * (room.height / room.width) * (qr.posY / room.height)}px`}}
        />
      ))}
    </Wrap>
  );
}