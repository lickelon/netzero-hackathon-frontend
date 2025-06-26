import { useState } from 'react'
import * as Forms from './Form.styles.js'
import  testImg from '../../public/test.jpg'
import { getRoom, sendVote } from '../services/Api.js';
import { auth } from '../services/Auth.js';

export default function Form({room_id}) {
  // 지하철 호선 
  const [trainLine, setTrainLine] = useState(null);
  //const trainLine = roomInfo.lineNum;
  
  // 지하철 칸
  const [carNum, setCarNum] = useState(null);
  //const carNum = roomInfo.roomId;
  
  // 좌석 좌표
  const [point, setPoint] = useState();
  // 탑승 시간
  const [enterTime, setEnterTime] = useState(0);
  const [temperature, setTemperature] = useState(0);

  console.log(room_id);

  const initRoomInfo = async () => {
    const roomInfo = await getRoom(room_id);
    
    setCarNum(roomInfo.carNum);
    setTrainLine(roomInfo.lineNum);
  }

  initRoomInfo();

  const handleImgClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;  // 이미지 내부 상대 좌표
    const y = e.clientY - rect.top;

    setPoint({x, y});
    console.log(x, y);
  }


  function formatDateTimeISO(date) {
    return date.toISOString(); // 자동으로 ISO 8601 포맷, 예: "2025-06-26T12:00:00.000Z"
  }

  const saveData = () => {

    const currentTime = new Date();
    const previousTime = new Date(currentTime.getTime() - enterTime * 60 * 1000);

    const voteData = {
      pos_x: point.x,
      pos_y: point.y,
      enter_time: formatDateTimeISO(previousTime),
      vote_time: formatDateTimeISO(currentTime),
      score: temperature,
    }

    sendVote(auth(), room_id, voteData);
  }

  return (
    <Forms.Box>
      <Forms.Title>
        <h2> 지하철 냉방 조절 서비스 </h2>
        <p> 현재 여러분의 생각을 공유해주세요. </p>
      </Forms.Title>

      <Forms.Block>
        <Forms.Label htmlFor="enter_time">
          <p>지하철에 탑승한 지 얼마나 지났나요? (분 단위)</p>
        </Forms.Label>
        <Forms.Input
          id="enter_time" type="number" onChange={(e) => setEnterTime(e.target.value)}
        />
      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="train-line">
          현재 탑승한 지하철 호선
        </Forms.Label>
        <Forms.Input id="train-line" type="text" value={trainLine ?  `${trainLine} 호선` : null} readOnly />
      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="room-num">
          현재 탑승한 호차
        </Forms.Label>
        <Forms.Input id="room-num" type="text" value={carNum ? `${carNum} 호차` : null} readOnly />

      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="temperature-score">
          현재 온도를 어떻게 느끼시고 있나요?
        </Forms.Label>
        <Forms.RadioArea id="temperature-score">
          <label><input type="radio" value="2" name="temperature" onChange={(e) => setTemperature(e.target.value)} />매우 덥다</label>
          <label><input type="radio" value="1" name="temperature" onChange={(e) => setTemperature(e.target.value)} />약간 덥다</label>
          <label><input type="radio" value="0" name="temperature" onChange={(e) => setTemperature(e.target.value)} />적당하다</label>
          <label><input type="radio" value="-1" name="temperature" onChange={(e) => setTemperature(e.target.value)} />약간 춥다</label>
          <label><input type="radio" value="-2" name="temperature" onChange={(e) => setTemperature(e.target.value)} />매우 춥다</label>
        </Forms.RadioArea>
      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="location">
          현재 위치를 표시해주세요.
        </Forms.Label>
        <Forms.Img id="location">
          <img src={testImg} onClick={handleImgClick} className="clickable-image" />
          {point && (
            <Forms.Marker
              style={{ left: `${point.x}px`, top: `${point.y}px` }}
            />)
          }
        </Forms.Img>
      </Forms.Block>
      <Forms.Button type="button" onClick={saveData}> 저장하기 </Forms.Button>
    </Forms.Box>
  )
}