export function auth() {
  const uuid = getCookie("uuid") ?? crypto.randomUUID();
  console.log(`Auth called; uuid=${uuid}`);
  const date = new Date();
  date.setTime(date.getTime() + 48*60*60*1000);
  document.cookie=`uuid=${uuid}; expires=${date}`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if(cookie.startsWith(name + '=')) {
      return cookie.substring(name.length+1);
    }
  }
  return null;
}