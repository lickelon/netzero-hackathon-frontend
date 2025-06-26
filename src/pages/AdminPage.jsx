import { useEffect } from 'react';
import styled from "styled-components";
import Form from "../components/Form";
import { useSearchParams } from "react-router-dom";
import { getRoom } from "../services/Api";
import RoomInfo from '../components/RoomInfo';

const PageWrap = styled.div`
  background-color: light-dark(white, black);
  //display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100vw;
`;

export default function SurveyPage() {
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id") || null;
  useEffect(() => {
    if(room_id == null) return; //TODO: show room create page
    getRoom(room_id); //TODO: send room_id to RoomInfo component
  }, [room_id]);

  return (
    <PageWrap>
      <h1>This is Admin Page</h1>
      <RoomInfo room_id={room_id}></RoomInfo>
    </PageWrap>
  )
}