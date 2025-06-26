import { useEffect, useState } from 'react';
import styled from "styled-components";
import Form from "../components/Form";
import { useSearchParams } from "react-router-dom";
import getRooms, { getRoom } from "../services/Api";
import RoomInfo from '../components/RoomInfo';
import Votes from '../components/Votes';
import { useNavigate } from 'react-router-dom';
import SurveyQR from '../components/SurveyQR';
import { QRCodeCanvas } from 'qrcode.react';

const PageWrap = styled.div`
  background-color: light-dark(white, black);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100vw;
  height: 100vh;

  h1{
    margin-bottom: 20px;
  }
`;

const VoteWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  
  padding : 15px;
  border-radius: 10px;
  border: dashed black 3px;


  h{
    font-weight: bold;
    font-size: 23px;
    
  }

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .tmpDiv{
    display:flex;
    flex-direction: row;
  }
`

const VoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
  `;

const CreatePage = styled.button`
`; 

const RoomData = styled.div`
  display: flex;
  flex-direction: row ;
  justify-content: space-between;
  margin-right: 20px;
  border-radius: 8px;
  gap: 10px;
  border: dashed black 2px;

  h2{
    font-size: 18px;
    padding: 10px;
  }
`

export default function SurveyPage() {
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id") || null;
  const [room, setRoom] = useState("");
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    getRooms(room_id).then((result) => {
      if (result) {
        console.log("투표 데이터 있음:", result);
        setVotes(result);
      } else {
        console.log("투표 데이터 없음 또는 요청 실패");
      }
    }).catch((err) => {
      console.error("에러 발생:", err);
    });
  }, [room_id]);

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 3;

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVotes = votes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(votes.length / ITEMS_PER_PAGE);



  return (
    <PageWrap>
      <h1>관리자 페이지</h1>
      <div className='flex justify-between items-center'>
        {room ? <Wrapper>
          <RoomData>
            <h2>열차 이름 : {room['name']}</h2>
            <h2>열차 정보 : {`${room['lineNum']}호선 ${room['trainNum']}호차 ${room['carNum']}번칸`}</h2>
            <h2>내부 온도 : {room.aircons[0].temperature}</h2>
            <h2>풍량 : {room.aircons[0].power}</h2>

          </RoomData>
          <div className="tmpDiv">
          <RoomInfo room={room}></RoomInfo>
          <SurveyQR room_id={room_id}></SurveyQR>
          </div>

        
        </Wrapper>
        : 
        
        
        
        
        
        <button onClick={() => navigate('/create')}>create page</button>}


        
      </div>
      {room ?
      <VoteWrap>
        <h>해당 칸의 설문 정보</h>
        <VoteGrid>
          {currentVotes.map((cur) => (
            <Votes value={cur} key={cur.voteId} />
          ))}
        </VoteGrid>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            이전
          </button>

          <span>{currentPage + 1} / {totalPages}</span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </button>
        </div>
      </VoteWrap> : null}
    </PageWrap>
  )
}