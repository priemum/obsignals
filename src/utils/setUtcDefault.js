function setUtcDefault(currentUTC){
  const date = new Date()
  const utc = parseInt(date.toString().split('GMT')[1].split('00')[0]);
  if(!currentUTC && currentUTC !== 0){
    localStorage.setItem('currentutc', utc)
  }
  return localStorage.setItem('localutc', utc)
}

export default setUtcDefault