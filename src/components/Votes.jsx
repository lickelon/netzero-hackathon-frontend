import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: #f5f3ff;
  border: 1px solid #dcd6f7;
  border-radius: 12px;
  width: 320px;
  font-family: 'Inter', sans-serif;

  /* 💡 부드러운 보라색 그림자 */
  box-shadow:
    0 4px 12px rgba(106, 100, 241, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.05);

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 8px 20px rgba(106, 100, 241, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #3d3d3d;

  span.label {
    font-weight: bold;
    color: #6a64f1;
  }

  span.value {
    font-weight: bold;
  }
`;


export default function Votes({ value }) {
  if (!value) return null;

  return (
    <Card>
      <Row>
        <span className="label">탑승 시간</span>
        <span className="value">{value.enterTime}</span>
      </Row>
      <Row>
        <span className="label">온도 점수</span>
        <span className="value">{value.hotColdScore}</span>
      </Row>
      <Row>
        <span className="label">혼잡도 점수</span>
        <span className="value">{value.insideCongestionScore}</span>
      </Row>
      <Row>
        <span className="label">실외 습도</span>
        <span className="value">{value.outdoorHumidity}</span>
      </Row>
      <Row>
        <span className="label">실외 온도</span>
        <span className="value">{value.outdoorTemperature}</span>
      </Row>
      <Row>
        <span className="label">투표 ID</span>
        <span className="value">{value.voteId}</span>
      </Row>
      <Row>
        <span className="label">투표 시간</span>
        <span className="value">{value.voteTime}</span>
      </Row>
    </Card>
  );
}   