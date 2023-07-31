import './Header.css'

export default function Header() {
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
            <p className='liveTime'>21:12</p>
          </div>
        </div>  
      </div>
    </header>
  )
}

