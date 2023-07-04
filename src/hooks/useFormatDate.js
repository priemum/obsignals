function useFormatDate(date){
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hour12: false
  };

  return date.toLocaleString('en-US', options).toUpperCase() ;
}

export default useFormatDate