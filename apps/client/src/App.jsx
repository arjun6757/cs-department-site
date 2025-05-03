import { useState } from "react"
import "./App.css"

export default function UserModal() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Sign in attempt with:", { email, password })
    // In a real app, you would handle authentication here
  }

  return (
    <div className="modal-container">
      <div className="user-modal">
        <div className="user-info">
          <div className="avatar">
            <img src="/placeholder.svg?height=100&width=100" alt="User avatar" />
          </div>
          <h2>John Doe</h2>
          <p className="user-email">john.doe@example.com</p>
          <div className="user-details">
            <p>
              <strong>Member since:</strong> Jan 2023
            </p>
            <p>
              <strong>Last login:</strong> Today at 10:45 AM
            </p>
            <p>
              <strong>Status:</strong> <span className="status-active">Active</span>
            </p>
          </div>
        </div>
      </div>

      <div className="sign-in-container">
        <div className="sign-in-form">
          <h1>Sign In</h1>
          <p>Welcome back! Please sign in to your account.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </button>
          </form>

          <p className="sign-up-prompt">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
