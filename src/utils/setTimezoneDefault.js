function setTimezoneDefault(currentTimezone){
  const idFromBrazil = 64
  if(!currentTimezone){
    localStorage.setItem('timezoneId', idFromBrazil)
  }
  return;
}

export default setTimezoneDefault