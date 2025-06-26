import { useState } from 'react'
import * as Forms from './Form.styles.js'
import  testImg from '../../public/test.jpg'

export default function Form() {
  // 지하철 호선 
  const [trainLine, setTrainLine] = useState("default 호선");
  // 지하철 칸
  const [roomNum, setRoomNum] = useState("default 칸");
  // 좌석 좌표
  const [point, setPoint] = useState();
  // 탑승 시간
  const [enterTime, setEnterTime] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const [voteData, setVoteData] = useState();

  const handleImgClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;  // 이미지 내부 상대 좌표
    const y = e.clientY - rect.top;

    setPoint({x, y});
    console.log(x, y);
  }

  function formatDateTime(date) {
    const pad = (n) => String(n).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const min = pad(date.getMinutes());
    const sec = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }

  const saveData = () => {
    console.log(enterTime);
    console.log(trainLine);
    console.log(roomNum);
    console.log(temperature);
    console.log(point);

    const currentTime = new Date();
    const previousTime = new Date(currentTime.getTime() - enterTime * 60 * 1000);

    console.log(formatDateTime(previousTime));
    console.log(formatDateTime(currentTime));
    setVoteData(
      {
        pos_x : point.x,
        pos_y : point.y,
        enter_time: formatDateTime(previousTime),
        vote_time: formatDateTime(currentTime),
        score: temperature
      }

    )
  }

  return (
    <Forms.Box>
      <Forms.Title>
        <h2> 지 하 철 냉 방 조 절 서 비 스 </h2>
        <p> 지하철의 온도를 조절할 수 있는 서비스 입니다. . . </p>
      </Forms.Title>

      <Forms.Block>
        <Forms.Label htmlFor="enter_time">
          지하철에 탑승한 지 얼마나 지났나요? (분 단위)
        </Forms.Label>
        <Forms.Input
          id="enter_time" type="number" onChange={(e) => setEnterTime(e.target.value)}
        />
      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="train-line">
          현재 탑승한 지하철 호선
        </Forms.Label>
        <Forms.Input id="train-line" type="text" value={trainLine} readOnly />
      </Forms.Block>

      <Forms.Block>
        <Forms.Label htmlFor="room-num">
          현재 탑승한 호차
        </Forms.Label>
        <Forms.Input id="room-num" type="text" value={roomNum} readOnly />

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