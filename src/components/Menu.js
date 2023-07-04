import { useContext, useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import useFormatDate from '../hooks/useFormatDate'
import { WebSocketContext } from '../context/webSocketContext'

import utcs from '../utils/utcs'

import mediumHour from '../images/mediumHour.svg'
import binaryTradersLogo from '../images/binaryTradersLogo.svg'
import arrowRight from '../images/arrowRight.svg'

import styles from '../styles/Menu.module.css'
import "react-toggle/style.css"

function Menu(){
  const [ currentTime, setCurrentTime ] = useState('')
  const localUtc = parseInt(localStorage.getItem('localutc'))
  const currentUTC = parseInt(localStorage.getItem('currentutc'))
  const currentTimezone = parseInt(localStorage.getItem('timezoneId'))
  const formatDate = useFormatDate

  function updateTimer(){
    const currentUTC = parseInt(localStorage.getItem('currentutc'))
    if(localUtc !== currentUTC){
      const oneMinuteInMiliseconds = 60000
      const oneHourInMiliseconds = 3600000
      const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * oneMinuteInMiliseconds);
      let newTime = formatDate(new Date(utcTime + (oneHourInMiliseconds * currentUTC))).split(' (')[0]
      const is24Hour = newTime.split(':')[0].includes(', 24')
      newTime = (is24Hour)? newTime.replace('24:', '00:') : newTime
      return setCurrentTime(newTime)
    }
    return setCurrentTime(formatDate(new Date()).split(' (')[0])
  }

  useEffect(()=>{
    const timerId = setInterval(() => updateTimer(), 1000);

    return function cleanup() {
      clearInterval(timerId)
    }
    // eslint-disable-next-line
  }, [])

  const { isTimeframeOneActived,
          isTimeframeFiveActived,
          setIsTimeframeOneActived, 
          setIsTimeframeFiveActived, 
          changeToTimeframeOne, 
          changeToTimeframeFive
         } = useContext(WebSocketContext)

  function setSwitchDefault(){
    const timeframe = localStorage.getItem('timeframe')
    if(timeframe === null || !timeframe){
      return ;
    } 

    const setSwitchActived = {
      'M1': () => {
        setIsTimeframeOneActived(true)
        setIsTimeframeFiveActived(false)
      },
      'M5': () => {
        setIsTimeframeOneActived(false)
        setIsTimeframeFiveActived(true)
      }
    }
    
    setSwitchActived[timeframe]()
  }

  setSwitchDefault()

  function changeTimeZone(id, utc){
    localStorage.setItem('currentutc', utc)
    return localStorage.setItem('timezoneId', id)
  }

  return (
    <div className={styles.menuContainer}>
      <header>
        <img src={binaryTradersLogo} width={25} height={25} alt="Binary Traders logo" />
      </header>
      <div className={styles.signalTimeframe}>
        <p>Signal Timeframe</p>
        <span className={styles.minuteOption}>
          <p><img src={mediumHour} width={19} height={19} alt="Clock" /> 1 Minute</p>
          <Toggle
            checked={isTimeframeOneActived}
            icons={false}
            onClick={() => changeToTimeframeOne()}
            onChange={() => {}} 
          />
        </span>
        <span className={styles.minuteOption}>
          <p><img src={mediumHour} width={19} height={19} alt="Clock" /> 5 Minutes</p>
          <Toggle
            checked={isTimeframeFiveActived}
            icons={false}
            onClick={() => changeToTimeframeFive()}
            onChange={() => {}} 
          />
        </span>
      </div>
      <div className={styles.signalTimezone}>
        <p>Signal Timezone</p>
        <span className={styles.timezones}>
          {
            utcs.map((item) => (
              <span key={item.id} className={styles.timezoneItem}>
              <img src={arrowRight} width={15} height={12} alt="Arrow right" />
              <label className={styles.checkboxContainer}>
                <input type="checkbox"
                 checked={item.id === currentTimezone}
                 onChange={() => changeTimeZone(item.id, item.utc)}
                />
                <span className={styles.checkmark}></span>
                <p>{item.text}</p>
              </label>
            </span>
            ))
          }
        </span>
      </div>
      <footer>
        <p>
          CURRENT TIME: {currentTime.replace('GMT-3', `(UTC${currentUTC}:00)`)}
        </p>
      </footer>
    </div>
  )
}

export default Menu