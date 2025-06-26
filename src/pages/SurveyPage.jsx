import styled from "styled-components";
import Form from "../components/Form";
import { getRoom } from "../services/Api";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageWrap = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100vw;
`;

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
    </div>
  );
}

export default function SurveyPage() {
  const query = new URLSearchParams(useLocation().search);
  const room_id = query.get('room_id');
  console.log(room_id);
  
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // optional
  
 useEffect(() => {
  async function fetchRoom() {
    if (!room_id) {
      // room_id 없으면 바로 404 처리
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const res = await getRoom(room_id);
    } catch (err) {
      console.error("룸 정보를 불러오는 데 실패했습니다:", err.message);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  fetchRoom();
}, [room_id]);

  if (loading) return <div>로딩 중...</div>;

  if (notFound) return <NotFound />;
  

  return (
    <PageWrap>
      <Form roomData={room_id} />
    </PageWrap>
  );
}