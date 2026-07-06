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
      {/* Hero Section */}
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

      {/* Benefits Section */}
      <div className='benefits-section'>
        <div className='benefits-info-box breathing'>
          <div className='circle'>
            <img src='/bank.png' className='image-icons bank'/>
          </div>
          <div>
            <h2>Expense Insights</h2>
            <p>Add income and expenses instantly.</p>
          </div>
        </div>

        <div className='benefits-info-box breathing-2'>
          <div className='circle'>
            <img src='/uptrend.png' className='image-icons'/>
          </div>
          <div>
            <h2>Predictive Goals</h2>
            <p>See months needed to save.</p>
          </div>
        </div>

        <div className='benefits-info-box breathing'>
          <div className='circle'>
            <img src='/data-analysis.png' className='image-icons data-analysis'/>
          </div>
          <div>
            <h2>Financial Dashboard</h2>
            <p>View reports and spot trends.</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
