import { useEffect, useState } from "react";
import { getRoom } from "../services/Api";

export default function RoomInfo(props) {
  const [room, setRoom] = useState("");
  useEffect(() => {
    getRoom(props.room_id)
      .then((_room) => {
        setRoom(_room);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.room_id]);
  return (
    <div>
      <h1>{room['name']}</h1>
    </div>
  );
}