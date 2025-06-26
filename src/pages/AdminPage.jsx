import { useEffect, useState } from 'react';
import styled from "styled-components";
import Form from "../components/Form";
import { useSearchParams } from "react-router-dom";
import getRooms, { getRoom } from "../services/Api";
import RoomInfo from '../components/RoomInfo';
import Votes from '../components/Votes';

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
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (room_id == null) return; //TODO: show room create page
    getRoom(room_id)
      .then((_room) => {
        setRoom(_room);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [room_id]);

  useEffect(() => {
    getRooms(room_id).then((result) => {
      if (result) {
        console.log("투표 데이터 있음:", result);
        setRooms(result);
      } else {
        console.log("투표 데이터 없음 또는 요청 실패");
      }
    }).catch((err) => {
      console.error("에러 발생:", err);
    });
  }, [room_id]);





  return (
    <PageWrap>
      <h1>관리자 페이지</h1>
      {room ? <RoomInfo room={room}></RoomInfo> : <div>create page</div>}
      

      {rooms.map((cur) => {
        return <Votes value={cur} key={cur.voteId}/>
      })}
    </PageWrap>
  )
}