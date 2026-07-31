import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import '../css/HomePage.css'
import NavBar from '../components/Nav-Bar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./web-pages/Login.jsx"

function HomePage () {
    const base = import.meta.env.BASE_URL;

const instructions = [
  {
    label: "Log Your Financial Data",
    description: "Add your income sources and dates. Track expenses and mark them as short-term or long-term.",
    step: "Step One",
    number: 1,
    image: `${base}purse.png`,
  },
  {
    label: "Set Your Goals",
    description: "Define what you're saving for and your target amount. Budgevo calculates your required monthly contribution.",
    step: "Step Two",
    number: 2,
    image: `${base}pie-chart.png`,
  },
  {
    label: "Track & Achieve",
    description: "Monitor your progress on the dashboard. Adjust your budget and watch yourself reach your goals.",
    step: "Step Three",
    number: 3,
    image: `${base}target.png`,
  },
];

const security_benefits = [
  {
    label: "Bank-Grade Encryption",
    description: "Your data is encrypted and protected with industry-standard security.",
    image: `${base}verified.png`,
  },
  {
    label: "You're In Control",
    description: "We never access or store your banking credentials.",
    image: `${base}user-success.png`,
  },
  {
    label: "Secure Login",
    description: "Advanced protection keeps your account safe and private.",
    image: `${base}padlock.png`,
  },
];

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;

  useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



  return (
    <>

      

      <NavBar />
      {/* Hero Section */}
      <div className='hero-section'>
        <div className='hero-section-heading'>
            <h1>Take Control Of <br /> <span>Your Money.</span> <br /> Build a Better Future.</h1>
            <p>Budgevo helps you track expenses, set goals, and grow your savings - all in one place.</p>
            <br />
            <div className='hero-buttons-container'>
              <button>Start Saving Today</button> 
              <button className='white-button'> <img src={`${base}play-button.png`} id="play-button" />See How It Works</button> 
            </div>
        </div>
        <div className='hero-section-image'>
          <img src={`${base}home-page-phone.png`} />
        </div>
      </div>

      {/* Benefits Section */}
      <div className='benefits-section'>
        <div className='benefits-info-box breathing'>
          <div className='circle'>
            <img src={`${base}bank.png`} className="image-icons bank" />
          </div>
          <div>
            <h2>Expense Insights</h2>
            <p>Add income and expenses instantly.</p>
          </div>
        </div>

        <div className='benefits-info-box breathing-2'>
          <div className='circle'>
            <img src={`${base}uptrend.png`} className="image-icons" />
          </div>
          <div>
            <h2>Predictive Goals</h2>
            <p>See months needed to save.</p>
          </div>
        </div>

        <div className='benefits-info-box breathing'>
          <div className='circle'>
            <img src={`${base}data-analysis.png`} className="image-icons data-analysis" />
          </div>
          <div>
            <h2>Financial Dashboard</h2>
            <p>View reports and spot trends.</p>
          </div>
        </div>
      </div>

      {/* Get Started Section */}

      <div className='get-started-section'>
        <div className='get-started-image'>
          <img src={`${base}PC-image.png`} />
          <div className='get-started-circle' />

         
            <div
            className="circle-grid"
            style={{
                gridTemplateColumns: `repeat(${7}, 1fr)`,
                gridTemplateRows: `repeat(${6}, 1fr)`
            }}
        >
            {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="get-started-circles" ></div>
            ))}
        </div>
       
        </div>

        <div className='get-started-heading'>
          <h1>Manage Your Money with <span>Confidence</span></h1>
          <div className='get-started-line' />
          <p>Track your income, expenses, and savings in one beautiful dashboard. Gain better financial insights, make smarter decisions, and stay on track toward your goals with ease.</p>
          <button>Get Started ➜</button>
        </div>
      </div>

      {/* INSTRUCTIONS SECTION */}

      <div className='instructions-section'>

        {instructions.map((instruction) => (
          <div className='instructions-container' key={instruction.number}>

          {isMobile ? (
            <>
               <div className='instructions-icons'>
                <div className='instructions-number'>
                <div className='circle'>{instruction.number}</div>
              </div>

              <div className='instructions-icon-container'>
                <div className='circle instructions-icon'>
                  <img src={instruction.image} className='image-icons wallet'/>
                </div>
              </div>
              </div>

              <div className='step-heading'>
            <h2>{instruction.step}</h2>
            <hr />
          </div>
              <div className='instructions-heading'>
            <h2>{instruction.label}</h2>
          <p>{instruction.description}</p>
          </div>
             
            </>
          ) : (
            <>
            <div className='instructions-number'>
            <div className='circle'>{instruction.number}</div>
          </div>
          
          <div className='instructions-heading'>
            <h2>{instruction.label}</h2>
          <p>{instruction.description}</p>
          </div>
          <div className='instructions-icon-container'>
            <div className='circle instructions-icon'>
              <img src={instruction.image}className='image-icons wallet'/>
            </div>
          </div>
          </>
          )}
          </div>
        ))}
        
          
        <button>Go to Workspace ➜</button>
        {/* </div> */}
      </div>

      {/*  SECURITY SECTION */}
      <div className='security-section'>
        <div className='security-heading'>
          <div className='security-top-text'>
            <div className='circle'>
            <img src={`${base}verified.png`} />
          </div>
          <p className='security-small-text'>Your Security, Our Priority</p>
          </div>
          
          <h1>Your Data, <span>Your Security</span></h1>
          <hr />
          <p className='security-description'>Your manually put transactions - your banking information never leaves your control. Only secure your login.</p>
          <p className='green-p'>Budget with piece of mind.</p>

          <div className='security-items-container'>

            {security_benefits.map((security_benefit) => 
              isMobile ? (
                <>
                <div className='security-items'>
                  <div className='security-items-mobile'>
                    
                    <div className='security-image-icon'>
                    <img src={security_benefit.image}/>
              </div>
              <h2>{security_benefit.label}</h2>
                  </div>
              
              <div>
                {/* <h2>{security_benefit.label}</h2> */}
              <p>{security_benefit.description}</p>
              </div>
            </div>
                </>
              ) : (
                <>
                  <div className='security-items'>
              <div className='security-image-icon'><img src={security_benefit.image}/></div>
              <div>
                <h2>{security_benefit.label}</h2>
              <p>{security_benefit.description}</p>
              </div>
            </div>
                </>
              )
              )}
            

            {/* <div className='security-items'>
              <div className='security-image-icon'><img src='verified.png'/></div>
              <div>
                <h2>Bank-Grade Encrytion</h2>
              <p>Your data is encrypted and protected with industry-standard security.</p>
              </div>
            </div>

            <div className='security-items'>
              <div className='security-image-icon user-success'><img src="user-success.png" /></div>
              <div>
                <h2>You're In Control</h2>
                <p>We never accessed or store your banking credentials.</p>
              </div>
            </div>

            <div className='security-items'>
              <div className='security-image-icon padlock'><img src='padlock.png'/></div>
              <div>
                <h2>Secure Login</h2>
                <p>Advance protection keeps your account safe and private.</p>
              </div>
            </div> */}
          </div> 

          <div>
            <div className='security-small-text security-bottom-text'><img src={`${base}verified.png`} /><p>Your <b>privacy.</b> Your <b>control.</b> Your <b>commitment.</b></p></div>
          </div>
        </div>
        <div className='security-image'>
          <div className='icon-orbit'>
            <div className='circle-2 padlock-icon'><img src={`${base}padlock.png`} /></div>
          <div className='circle-2 bank-icon'><img src={`${base}bank.png`} /></div>
          <div className='circle-2 user-icon'><img src={`${base}user.png`} /></div>
          <div className='circle-2 check-mark-icon'><img src={`${base}check-mark.png`} /></div>
          </div>
          
          <img src={`${base}security-icon-2.png`} />
          
        </div>
      </div>
    </>
  )
}

export default HomePage