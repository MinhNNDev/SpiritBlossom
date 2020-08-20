import React, {useState, useEffect, useRef} from 'react'
import './countdown.sass'
import {getCurrentUser} from 'redux/selectors'
import { useSelector } from 'react-redux';

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

const Countdown = ({hover}) => {
    const [remainSecondState, setRemainSecondState] = useState(null)
    const {remain_second} = useSelector(getCurrentUser)
    // console.log('rerender', remainSecondState)
    if (!remainSecondState && remain_second !== null) {
      setRemainSecondState(remain_second)
    }

    useInterval(() => {
      setRemainSecondState(remainSecondState-1)
    }, 1000)

    let totalSeconds =  remainSecondState
    let hours = Math.max(0, Math.floor(totalSeconds / 3600))
    totalSeconds %= 3600;
    let minutes = Math.max(0, Math.floor(totalSeconds / 60))
    let seconds = Math.max(0, totalSeconds % 60)

    const {user} = useSelector(getCurrentUser)
    const accountName = '' || (user && user.account_name)
 
    return (
      <div className="countdown" onMouseEnter={hover}>
          SỰ KIỆN KẾT THÚC SAU {hours}:{minutes}:{seconds}
      </div>
    )
} 

export default Countdown