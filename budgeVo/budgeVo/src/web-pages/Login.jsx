import '../css/Login.css'
import { useState } from 'react'

function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [flipDirection, setFlipDirection] = useState('down'); // tracks flip direction

    const switchToSignUp = () => {
        setFlipDirection('up');   // green panel moves back down to bottom
        setIsLogin(true);
    };

    const switchToLogin = () => {
        setFlipDirection('down'); // green panel moves up to top
        setIsLogin(false);
    };

    return (
        <div className="login_wrapper">
            <div
                key={isLogin ? 'signup' : 'login'}
                className={`login_container flip-${flipDirection} ${isLogin ? '' : 'order-reverse'}`}
            >
                {isLogin ? (
                    <>
                        <div className='login'>
                            <h1>Sign Up</h1>
                            <hr />
                            <form>
                                <input name="email" type='email' placeholder='Enter your email' />
                                <input name="pwd" type='password' placeholder='Enter your password' />
                                <input type='submit' name='submit' value={"Sign Up"} className='submit_button' />
                            </form>
                        </div>
                        <div className='login_heading'>
                            <h2>Welcome to BudgeVo!</h2>
                            <p>Sign up so you can start your budgeting journey today! Take charge or your money!</p>
                            <button
                                className='login_heading_button'
                                onClick={switchToLogin}>
                                Already have an account? Login
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='login flip_login'>
                            <h1>Login</h1>
                            <hr />
                            <form>
                                <input name="email" type='email' placeholder='Enter your email' />
                                <input name="pwd" type='password' placeholder='Enter your password' />
                                <input type='submit' name='submit' value={"Login"} className='submit_button' />
                            </form>
                        </div>
                        <div className='login_heading'>
                            <h2>Welcome Back!</h2>
                            <p>Sign up so you can start your budgeting journey today! Take charge or your money!</p>
                            <button className='login_heading_button' onClick={switchToSignUp}>
                                Don't have an account? Sign Up
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login