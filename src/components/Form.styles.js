import styled from 'styled-components';

export const Box = styled.form`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  font-family: 'Inter', sans-serif;
  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  background: #FFEAD8;
  padding: 32px;
  max-width: 1000px;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

export const Title = styled.div`
  margin-bottom: 32px;
  text-align: center;

  background-color: white;
  padding: 5px;
  border-radius: 5px;

  h2 {
    font-weight: 700;
    font-size: 32px;
    color: #5e30b2;
    margin-bottom: 8px;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    color: #6f42c1;
  }
`;

export const Label = styled.label`
  color: #000000;
  font-size: 23px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  text-align: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #d1c4e9;
  background: #fff;
  font-size: 20px;
  color: #4b0082;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #8e44ad;
    box-shadow: 0 0 0 4px rgba(142,68,173,0.2);
    outline: none;
  }
`;

export const Block = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  border : 2px dashed black;
  border-radius: 5px;
  padding: 13px;
  
`;


export const Img = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  height: auto;
  margin: 0 auto 24px;
  border: 2px dashed #d1c4e9;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`; 

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 14px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #9b59b6, #6f42c1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 8px 20px rgba(111,66,193,0.3);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(111,66,193,0.2);
  }
`;

export const Marker = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #8e44ad;
  border: 2px solid #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;


export const RadioArea = styled.div`
  display: flex;
  gap: 16px;

  label {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #4b0082;
    cursor: pointer;

    input {
      margin-right: 6px;
      accent-color: #8e44ad;
    }
  }
`;