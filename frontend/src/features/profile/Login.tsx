import ProfilInput from "./ProfilInput";
import "./Login.css";
import { postLogin } from "../../api/authApi";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import type { LoginSucess } from "../../api/authApi";

type authMode = {
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

function LoginSignup({ setAuthMode }: authMode) {
  const authContext = useContext(AuthContext);

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const login: LoginSucess = await postLogin(
      loginData.email,
      loginData.password,
    );
    if (login.sucess) {
      setLoginErrors({
        email: "",
        password: "",
      });
      authContext?.setUser({
        firstname: login.data.firstname,
        lastname: login.data.lastname,
        email: login.data.email,
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

  const goToSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setAuthMode("signup");
  };

  const setEmail = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setLoginData((state) => {
      const loginData = {
        email: userInput,
        password: state.password,
      };

      return loginData;
    });
  };

  const setPassword = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setLoginData((state) => {
      const loginData = {
        email: state.email,
        password: userInput,
      };
      return loginData;
    });
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h3>Log in</h3>

        <form className="auth-form" action="#">
          <ProfilInput
            title="Email"
            type="email"
            value={loginData.email}
            onChange={setEmail}
          />
          <p className="error">{loginErrors.email}</p>
          <ProfilInput
            title="Password"
            type="password"
            value={loginData.password}
            onChange={setPassword}
          />
          <p className="error">{loginErrors.password}</p>

          <div className="auth-actions">
            <button
              onClick={(e) => {
                handleLogIn(e);
              }}
              className="btn btn-primary"
            >
              Log in
            </button>
            <button
              onClick={(e) => {
                goToSignUp(e);
              }}
              className="btn btn-secondary"
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
