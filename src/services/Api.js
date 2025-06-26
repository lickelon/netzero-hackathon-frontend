/*
 * Vote
 * pos_x: float
 * pos_y: float
 * enter_time: string
 * vote_time: string
 * score: int
 */
export async function sendVote(uuid, room_id, vote) {
  //TODO: send vote data to backend
  console.log(vote);

  const bodyData = {
    posX: vote.pos_x,
    posY: vote.pos_y,
    enterTime: vote.enter_time,
    voteTime: vote.vote_time,
    hotColdScore: vote.score,
  };

  try {
    const response = await fetch(`https://inha-net-zero-webapp.azurewebsites.net/vote?uuid=${uuid}&room_id=${room_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      
      throw new Error(`서버 에러: ${response.status}`);
      
    }

    const result = await response.json();
    console.log('서버 응답:', result);

  } catch (error) {
    console.error('요청 실패:', error);
  }

}

// pos_x: point.x,
//   pos_y : point.y,
//     enter_time: formatDateTime(previousTime),
//       vote_time: formatDateTime(currentTime),
//         score: temperature

export function getLatestVoteTime(uuid) {
  //TODO: get latest vote time from backend
  let date = new Date();
  return date;
}
/*
 * Room
 * name: string
 * line_num: int 
 * train_num: int
 * train_car: int
 * width: float
 * height: float
 * depth: float
 * QR: [(float,float), ...]
 * AC: [(float,float), ...]
 */

export async function getRoom(room_id) {
  //TODO: get Room data from backend
  let room = await fetch('https://inha-net-zero-webapp.azurewebsites.net/room?room_id=' + room_id)
  .then(response => {
    if (!response.ok) {
      // HTTP 에러면 여기서 에러 던짐 -> catch에서 잡힘
      throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .catch(error => {
    // 네트워크 에러거나 위에서 던진 에러를 여기서 잡음
    console.error('fetch 에러:', error);
    throw error;  // 필요하면 다시 던져서 바깥에서도 처리하게 할 수 있음
  });
  // let room = {};
  // room['name'] = 'my room';
  // room['width'] = 30.0;
  // room['height'] = 6.0;
  // room['depth'] = 1.0;
  // room['QR'] = [];
  // room['AC'] = [];
  // room['QR'].push([15, 0]);
  // room['AC'].push([30, 6]);
  console.log("123123");
  console.log(room);
  return room;
}

export default async function getRooms(room_id){
   try {
    const response = await fetch(`https://inha-net-zero-webapp.azurewebsites.net/vote/all?room_id=${room_id}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`서버 에러: ${response.status}`);
    }

    const data = await response.json();
    console.log('투표 데이터:', data);
    return data;

  } catch (error) {
    console.error('요청 실패:', error);
    return null;
  } 
}