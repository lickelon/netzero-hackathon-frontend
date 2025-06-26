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
    const previousTime = enterTime;

    const voteData = {
      pos_x: point.x,
      pos_y: point.y,
      enter_time: previousTime,
      vote_time: formatDateTimeISO(currentTime),
      score: temperature,
    }

    sendVote(auth(), room_id, voteData);
  }

  return (
    <form className="bg-white p-[32px] max-w-[640px] w-full shadow-2xl m-[20px] rounded-xl">
      <div className="w-full rounded-xl bg-white p-[5px] shadow-[0px_4px_10px_2px_rgba(0,_0,_0,_0.1)] mb-[32px]">
        <h2 className="nanum-gothic-bold font-bold text-black text-4xl"> 지하철 냉방 조절 서비스 </h2>
        <p className="nanum-gothic-bold font-bold text-gray-600 text-sm"> 현재 여러분의 생각을 공유해주세요. </p>
      </div>
      <div className="form-block">
        <p className="nanum-gothic-bold font-bold text-gray-700 text-3xl">현재 지하철 탑승 정보</p>
          <p className="nanum-gothic-bold font-bold text-gray-700 text-sm">{`${lineNum}호선 ${trainNum}호차 ${carNum}칸`}</p>
      </div>
      <div className="form-block">
        <label className="nanum-gothic-bold font-bold text-black text-2xl m-1" htmlFor="enter_time">
          <p>지하철에 탑승한 지 얼마나 지났나요?</p>
        </label>
        <div className="m-1 rounded-xl grid grid-cols-3 gap-2">
          {[0, 5, 10, 15, 20, 30].map((val) => (
            <label key={val} className="aspect-square w-full relative">
              <input
                type="radio"
                name="interval"
                value={val}
                onChange={(e) => setEnterTime(e.target.value)}
                className="appearance-none w-full h-full rounded-md border-2 border-gray-200 cursor-pointer checked:border-gray-700 checked:shadow-lg transition"
              />
              <span className="nanum-gothic-bold absolute inset-0 flex items-center justify-center text-xl text-black pointer-events-none">
                {`${val}m`}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-block">
        <div className='flex justify-between items-center w-11/12 self-center'>
          <p className='nanum-gothic-bold text-[rgba(105,105,105,0.7)]'>더움</p>
          <label className="nanum-gothic-bold font-bold text-black text-2xl m-1" htmlFor="temperature-score">
            현재 체감 온도는 어떠신가요?
          </label>
          <p className='nanum-gothic-bold text-[rgba(105,105,105,0.7)]'>추움</p>
        </div>
        
        <div className="m-1 rounded-full w-11/12 self-center h-[40px] flex justify-between items-center px-4" style={{backgroundImage:"linear-gradient(to right, #FF0909 0%, #F3481A 20%, #FABA2C 50%, #00BCF2)"}}>
          {[-2, -1, 0, 1, 2].map((val) => (
            <label key={val} className="relative w-7 h-7 flex items-center justify-center">
              <input
                type="radio"
                value={val}
                name="temperature"
                onChange={(e) => setTemperature(e.target.value)}
                className="appearance-none w-7 h-7 rounded-full border-4 border-[rgba(255,255,255,0.6)] cursor-pointer"
              />
              {temperature == val.toString() && (
                <div className="absolute w-4 h-4 bg-[rgba(120,120,120,0.5)] rounded-full" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="form-block">
        <label className="nanum-gothic-bold font-bold text-black text-2xl m-1" htmlFor="location">
          현재 위치를 표시해주세요.
        </label>
        <Forms.Img id="location">
          <img src={testImg} onClick={handleImgClick} className="clickable-image" />
          {point && (
            <Forms.Marker
              style={{ left: `${point.x}px`, top: `${point.y}px` }}
            />)
          }
        </Forms.Img>
      </div>
      <Forms.Button type="button" onClick={saveData}> 저장하기 </Forms.Button>
    </form>
  )
}