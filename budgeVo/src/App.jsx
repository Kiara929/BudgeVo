import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './components/Nav-Bar'

function App() {

  return (
    <>
      <NavBar />
      <div className='hero-section'>
        <div className='hero-section-heading'>
            <h1>Take Control Of <br /> <span>Your Money.</span> <br /> Build a Better Future.</h1>
            <p>Budgevo helps you track expenses, set goals, and  <br />grow your savings - all in one place.</p>
            <br />
            <div className='hero-buttons-container'>
              <button>Start Saving Today</button> 
              <button className='white-button'> <img src='/play-button.png' id='play-button'/>See How It Works</button> 
            </div>
        </div>
        <div className='hero-section-image'>
          <img src='/home-page-phone.png' />
        </div>
      </div>
    </>
  )
}

export default App
