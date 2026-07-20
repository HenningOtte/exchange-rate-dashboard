import ProfilInput from "./ProfilInput";
import "./LoginSignup.css";
import { postLogin } from "../../api/authApi";
import type { LoginSucess } from "../../api/authApi";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";

function LoginSignup() {
  const authContext = useContext(AuthContext);

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const login: LoginSucess = await postLogin();
    if (login.sucess) {
      setLoginErrors({
        email: "",
        password: "",
      });
      authContext?.setUser({
        firstname: "",
        lastname: "",
        email: "",
      });
      authContext?.setLoggedIn(true);
    } else {
      if (login.message == "Email not found.") {
        setLoginErrors({
          email: login.message,
          password: "",
        });
      } else {
        setLoginErrors({
          email: "",
          password: login.message,
        });
      }
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h3>Log in</h3>

        <form className="auth-form" action="#">
          <ProfilInput title="Email" type="email" />
          <p className="error">{loginErrors.email}</p>
          <ProfilInput title="Password" type="password" />
          <p className="error">{loginErrors.password}</p>

          <div className="auth-actions">
            <button
              onClick={(e) => {
                handleLogIn(e);
              }}
              className="logIn-btn"
            >
              Log in
            </button>
            <button
              onClick={(e) => {
                handleSignUp(e);
              }}
              className="signUp-btn"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
