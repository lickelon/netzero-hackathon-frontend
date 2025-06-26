import { useEffect, useState } from 'react';
import styled from "styled-components";
import Form from "../components/Form";
import { useSearchParams } from "react-router-dom";
import { getRoom } from "../services/Api";
import RoomInfo from '../components/RoomInfo';

const PageWrap = styled.div`
  background-color: light-dark(white, black);
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  padding: 0px;
  width: 100vw;
  height: 100vh;
`;

export default function SurveyPage() {
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id") || null;
  const [room, setRoom] = useState("");
  useEffect(() => {
    if(room_id == null) return; //TODO: show room create page
    getRoom(room_id)
      .then((_room) => {
        setRoom(_room);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [room_id]);

  return (
    <PageWrap>
      <h1>This is Admin Page</h1>
      {room ? <RoomInfo room={room}></RoomInfo> : <div>create page</div>}
    </PageWrap>
  )
}