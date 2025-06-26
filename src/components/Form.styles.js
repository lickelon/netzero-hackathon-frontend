import styled from 'styled-components';

export const Box = styled.form`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  background: white;
  padding: 8px;
  width: 100%;
`;

export const Title = styled.div`
  margin-bottom: 30px;
  h2 {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    color: #07074d;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    color: #536387;
    margin-top: 12px;
  }
`;

export const Label = styled.label`
  color: #536387;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  text-align: center;
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  color: #536387;
  outline: none;
  resize: none;
  &:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const Block = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;

  position: relative;
  display: inline-block;

  img{
    //TODO: modify height by room info
    width: 100%;
    height: auto;
  }
`;

export const Button = styled.button`
  font-size: 16px;
  border-radius: 5px;
  padding: 14px 25px;
  border: none;
  font-weight: 500;
  background-color: #6a64f1;
  color: white;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const Marker = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const RadioArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;