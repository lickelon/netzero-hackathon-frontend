import styled from "styled-components";
import Form from "../components/Form";
import { getRoom } from "../services/Api";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id") || null;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!room_id) {
      setRoom(null);
      return;
    }

    setLoading(true);
    getRoom(room_id)
      .then((_room) => {
        setRoom(_room);
      })
      .catch((error) => {
        console.error(error);
        setRoom(null);
      })
      .finally(() => setLoading(false));
  }, [room_id]);
  

  return (
    <PageWrap>
      {loading ? (
        <p>불러오는 중...</p>
      ) : room ? (
        <Form room_id={room_id} />
      ) : (
        <NotFound />
      )}
    </PageWrap>
  );
}