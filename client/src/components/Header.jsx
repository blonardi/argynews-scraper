import './Header.css'
import useDate from '../hooks/useDate'

export default function Header() {

  const {date, time, wish} = useDate()

  return (
    <header>
      <div className="h-container">
        <div className='headerBox'>
          <p>☀️</p>
        </div>
        <div className='headerBox'>
          <h1>ArgyNews</h1>
        </div>
        <div className='headerBox'>
          <div className='liveTimeBox'>
            <p className='liveTime'>{date} - {time}</p>
          </div>
        </div>  
      </div>
    </header>
  )
}

