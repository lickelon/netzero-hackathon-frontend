import { useState } from 'react'
import './Form.css'
import  testImg from '../../public/test.jpg'

export default function Form() {
  // 지하철 호선 
  const [trainLine, setTrainLine] = useState(0);
  // 지하철 칸
  const [roomNum, setRoomNum] = useState(0);
  // 좌석 좌표
  const [point, setPoint] = useState();

  const handleImgClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;  // 이미지 내부 상대 좌표
    const y = e.clientY - rect.top;

    setPoint({x, y});
  }


  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="formbold-form-title">
            <h2> 지 하 철 냉 방 조 절 서 비 스 </h2>
            <p>
              지하철의 온도를 조절할 수 있는 서비스 입니다. . . 
            </p>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="train-line" className="formbold-form-label">
              현재 탑승한 지하철 호선
            </label>

            <select id="train-line" name="train-line" className="formbold-form-select" onChange={(e) => setTrainLine(e.target.value)}>
              <option value="1">1호선</option>
              <option value="2">2호선</option>
              <option value="3">3호선</option>
            </select>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="address2" className="formbold-form-label">
              현재 탑승한 호차
            </label>
            <select id="train-line" name="train-line" className="formbold-form-select" onChange={(e) => setRoomNum(e.target.value)}>
              <option value="1">1호차</option>
              <option value="2">2호차</option>
              <option value="3">3호차</option>
            </select>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="address2" className="formbold-form-label">
              현재 온도를 어떻게 느끼시고 있나요?
            </label>
            <div className="formbold-radio">
              <label><input type="radio" value="2" name="temperature" />매우 덥다</label>
              <label><input type="radio" value="1" name="temperature" />약간 덥다</label>
              <label><input type="radio" value="0" name="temperature" />적당하다</label>
              <label><input type="radio" value="-1" name="temperature" />약간 춥다</label>
              <label><input type="radio" value="-2" name="temperature" />매우 춥다</label>
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="address2" className="formbold-form-label">
              현재 위치를 표시해주세요. 
            </label>
            <div className="formbold-img">
              <img src={testImg} onClick={handleImgClick} className="clickable-image" />
              {point && (
                <div
                  className="marker"
                  style={{ left: `${point.x}px`, top: `${point.y}px` }}
                />)
              }
            </div>
          </div>

          <button className="formbold-btn">Register Now</button>
        </form>
      </div>
    </div>
  )
}