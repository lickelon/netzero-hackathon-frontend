import RoomGraphics from "./RoomGraphics";

export default function RoomInfo({room}) {
  return (
    <div>
      <h2>{room['name']}</h2>
      <h2>{`${room['lineNum']}호선 ${room['trainNum']}호차 ${room['carNum']}번칸`}</h2>
      <RoomGraphics room={room}></RoomGraphics>

    </div>
  );
}