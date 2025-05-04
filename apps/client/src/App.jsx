import { useEffect, useRef, useState } from "react"
import "./App.css"
import { useUser } from "./context/auth.context.jsx";

export default function UserModal() {
  const { user, setUser, setUserError, userError } = useUser();
  const API = "http://localhost:3000";
  const [message, setMessage] = useState("");
  const formRef = useRef();
  const [isLogin, setIsLogIn] = useState(true);

  useEffect(() => {
    if (message === "") return;

    const timeoutId = setTimeout(() => {
      setMessage("")
    }, 1000)

    return () => clearTimeout(timeoutId);
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current)
    let URL = `${API}/api/auth/${isLogin ? 'login' : 'signup'}`

    const username = formData.get("username");
    const email = formData.get("email")
    const password = formData.get("password")

    let body = {
      username, email, password
    }

    formRef.current.reset();

    if (!email || !password) {
      return setMessage("All fields must be inserted!");
    }

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const result = await response.json()
        setMessage(result.message);
        if (response.status===401) {
          setUser(null);
          setUserError(result.message)
        }
        return;
      }


      const result = await response.json();
      setMessage(result.message);
      const { data } = result;
      setUser(data);

    } catch (error) {
      setMessage(error.message)
    }
  }

  const customFormat = (date) => {
    const d = new Date(date)
    d.toLocaleString('IN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    })

    return d.toString();
  }

  return (
    <div className="modal-container">
      <div className="user-modal">
        <div className="user-info">
          <div className="avatar">
            <div style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em", background: "#f0f0f0" }} >
              {user ? user.email.charAt(0).toUpperCase() : "?"}
            </div>
            {/* <img src="/placeholder.svg?height=100&width=100" alt="User avatar" /> */}
          </div>
          <h2>{user ? user.username : 'null'}</h2>
          <p className="user-email">{user ? user.email : 'null'}</p>
          <div className="user-details">
            <p>
              <strong>Member since:</strong> {user ? customFormat(user.createdAt) ?? "no date in user" : "null"}
            </p>
            <p>
              <strong>Last login:</strong> Today at 10:45 AM
            </p>
            <p>
              <strong>Status:</strong> <span className="status-active">{user ? 'Authorized' : 'Unauthorized'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="sign-in-container">
        <div className="sign-in-form">
          <h1>Sign In</h1>
          <p>Welcome back! Please sign in to your account.</p>

          <form ref={formRef} onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="sign-in-button">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p style={{ margin: "10px 0" , height: message ? '20px' : '0px',  width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', transition: 'height 0.3s ease' }}>
            {message}
          </p>

          <p className="sign-up-prompt">
            Don't have an account? <a href="#" onClick={(e) => {
              e.preventDefault();
              setIsLogIn(p => !p);
            }} >{isLogin ? 'Sign up' : 'Sign in'}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
