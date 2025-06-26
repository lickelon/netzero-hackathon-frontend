import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function SurveyQR({room_id}) {
  const [target, setTarget] = useState("");
  
  useEffect(() => {
    const url = new URL(window.location.href);
    const targetUrl = url.origin + "/#/survey?room_id="+room_id;
    setTarget(targetUrl);
  }, []);
  
  return (
    <div className='m-2 p-2 border-2'>
      <QRCodeSVG value={target} size={380}/>
    </div>
  )
}