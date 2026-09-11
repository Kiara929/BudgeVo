import '../css/Login.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [flipDirection, setFlipDirection] = useState('down'); // tracks flip direction
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const switchToSignUp = () => {
        setFlipDirection('up');   // green panel moves back down to bottom
        setIsLogin(true);
    };

    const switchToLogin = () => {
        setFlipDirection('down'); // green panel moves up to top
        setIsLogin(false);
    };

//     useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/test")
//         .then((response) => response.json())
//         .then((data) => {
//             setMessage(data.message);
//         })
//         .catch((error) => {
//             console.error("Error connecting to Laravel:", error);
//         });
// }, []);

const getCookie = (name) => {
    const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];

    return value ? decodeURIComponent(value) : null;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // 1. Get CSRF cookie from Laravel
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            method: "GET",
            credentials: "include",
        });

        // 2. Get CSRF token
        const csrfToken = getCookie("XSRF-TOKEN");

        // 3. Login or signup
        const response = await fetch(
            !isLogin
                ? "http://localhost:8000/api/login"
                : "http://localhost:8000/api/signup",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    email,
                    password,
                    ...(!isLogin && { name }),
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        console.log(data);

        // Login successful
        
            navigate("/workspace");
        
    } catch (error) {
        console.error("Error:", error);
    }
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
                            <form onSubmit={handleSubmit}>
                                <input name="name" type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                                <input name="email" type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input name="pwd" type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                            <form onSubmit={handleSubmit}>
                                <input name="email" type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input name="pwd" type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type='submit' name='submit' className='submit_button' />
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