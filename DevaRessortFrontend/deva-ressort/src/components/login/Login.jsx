


// import React, { useState, useEffect } from "react";
// import { loginUser } from "../utils/ApiFunctions";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

// const Login = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Load dark mode theme preference from localStorage
//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem("darkMode") === "true";
//     setDarkMode(savedDarkMode);
//   }, []);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       toast.warn("Please fill in both fields!");
//       return;
//     }

//     const userData = { username, password };

//     try {
//       const result = await loginUser(userData); // Call the loginUser function

//       console.log(result); // Debugging - See what API returns

//       if (result.token) {
//         toast.success("Login Successfully! ✅");
//         localStorage.setItem("authToken", result.token);

//         // Clear input fields after successful login
//         setUsername("");
//         setPassword("");
//       } else {
//         toast.error(result.message || "Login Failed!");
//       }
//     } catch (error) {
//       toast.error(error.message || "An unexpected error occurred!");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="container">
//         <div className="content">
//           <div className={darkMode ? "dark-mode" : ""}>
//             <div className="login-box">
//               <h1>Login</h1>
//               <form>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="button" onClick={handleLogin}>
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Card from "../ui/Card";
import Button from "../ui/Button";
import "./AuthForm.css";
import { registerUser,loginUser } from "../utils/ApiFunctions";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (isRegister && formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (isRegister) {
          await registerUser(formData);
          alert("Registered successfully! Please log in.");
          setIsRegister(false);
        } else {
          await loginUser(formData);
          alert("Logged in successfully!");
          setLoggedIn(true);
        }
        setFormData({ username: "", email: "", password: "" });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-form-container">
      {loggedIn ? (
        <Card className="auth-card">
          <h2 className="auth-title">Welcome!</h2>
          <p>You are successfully logged in.</p>
          <Button onClick={() => setLoggedIn(false)} className="auth-button">Logout</Button>
        </Card>
      ) : (
        <Card className="auth-card">
          <h2 className="auth-title">{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                {errors.username && <p className="error-text">{errors.username}</p>}
              </div>
            )}
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <Button type="submit" className="auth-button">
              {isRegister ? "Register" : "Login"}
            </Button>
          </form>
          <p className="toggle-text" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Login;
