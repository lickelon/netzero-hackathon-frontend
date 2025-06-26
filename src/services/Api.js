/*
 * Vote
 * pos_x: float
 * pos_y: float
 * enter_time: string
 * vote_time: string
 * score: int
 */
export function sendVote(vote) {
  //TODO: send vote data to backend
  console.log(vote);
}

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

export function getRoom(room_id) {
  //TODO: get Room data from backend
  let room = {};
  room['name'] = 'my room';
  room['width'] = 30.0;
  room['height'] = 6.0;
  room['depth'] = 1.0;
  room['QR'] = [];
  room['AC'] = [];
  room['QR'].push([15, 0]);
  room['AC'].push([30, 6]);

  console.log(room);
  return room;
}