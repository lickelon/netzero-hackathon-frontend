import { useState,useEffect } from 'react'
import * as Forms from './Form.styles.js'
import './Form.css'
import  testImg from '../../public/test.jpg'
import { getRoom, sendVote } from '../services/Api.js';
import { auth } from '../services/Auth.js';

export default function Form({room_id}) {
  // 지하철 호선 
  const [lineNum, setLineNum] = useState(0);
  const [trainNum, setTrainNum] = useState(0);
  const [carNum, setCarNum] = useState(0);
  
  // 좌석 좌표
  const [point, setPoint] = useState();
  // 탑승 시간
  const [enterTime, setEnterTime] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const initRoomInfo = async () => {
    const roomInfo = await getRoom(room_id);
    console.log('room info initialized');
    setLineNum(roomInfo.lineNum);
    setTrainNum(roomInfo.trainNum);
    setCarNum(roomInfo.carNum);
  }
  useEffect(() => {
    initRoomInfo();
  }, []);

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
    <form className="bg-white p-[32px] max-w-[640px] w-full shadow-2xl m-[20px] rounded-xl">
      <div className="w-full rounded-xl bg-white p-[5px] shadow-[0px_4px_10px_2px_rgba(0,_0,_0,_0.1)] mb-[32px]">
        <h2 className="font-bold text-black text-3xl"> 지하철 냉방 조절 서비스 </h2>
        <p className="text-gray-600 text-sm"> 현재 여러분의 생각을 공유해주세요. </p>
      </div>
      <div className="form-block">
        <p className="font-bold text-black text-3xl">현재 지하철 탑승 정보</p>
          <p className="font-bold text-black text-md">{`${lineNum}호선 ${trainNum}호차 ${carNum}칸`}</p>
      </div>
      <div className="form-block">
        <Forms.Label htmlFor="enter_time">
          <p>지하철에 탑승한 지 얼마나 지났나요? (분 단위)</p>
        </Forms.Label>
        <Forms.Input
          id="enter_time" type="number" onChange={(e) => setEnterTime(e.target.value)}
        />
      </div>
      <div className="form-block">
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
      </div>

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
    </form>
  )
}