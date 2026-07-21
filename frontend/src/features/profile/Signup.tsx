import ProfilInput from "./ProfilInput";
import { useState } from "react";
import { postRegister } from "../../api/authApi";
import type { RegisterSucess } from "../../api/authApi";

type authMode = {
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

function Signup({ setAuthMode }: authMode) {
  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const setFirstName = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setSignUp((state) => {
      return {
        firstname: userInput,
        lastname: state.lastname,
        email: state.email,
        password: state.password,
      };
    });
  };

  const setLastName = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setSignUp((state) => {
      return {
        firstname: state.firstname,
        lastname: userInput,
        email: state.email,
        password: state.password,
      };
    });
  };

  const setEmail = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setSignUp((state) => {
      return {
        firstname: state.firstname,
        lastname: state.lastname,
        email: userInput,
        password: state.password,
      };
    });
  };

  const setPassword = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const userInput = e.currentTarget.value;

    setSignUp((state) => {
      return {
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
        password: userInput,
      };
    });
  };

  const goToLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setAuthMode("login");
  };

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = signUp;
    const message = await postRegister(
      firstname.trim(),
      lastname.trim(),
      email.trim(),
      password.trim(),
    );

    handleErrors(message);
  };

  function handleErrors(errors: RegisterSucess[]) {
    if (errors.length === 0 || errors[0].sucess) return;

    setLoginErrors(() => {
      let newLoginErrors = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      };

      errors.forEach((error) => {
        if (error.path == "firstname") newLoginErrors.firstname = error.msg;
        if (error.path == "lastname") newLoginErrors.lastname = error.msg;
        if (error.path == "email") newLoginErrors.email = error.msg;
        if (error.path == "password") newLoginErrors.password = error.msg;
      });

      return newLoginErrors;
    });
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h3>Sign up</h3>

        <form className="auth-form" action="#">
          <ProfilInput
            title="First Name"
            type="text"
            value={signUp.firstname}
            onChange={setFirstName}
          />
          <p className="error">{loginErrors.firstname}</p>
          <ProfilInput
            title="Last Name"
            type="text"
            value={signUp.lastname}
            onChange={setLastName}
          />
          <p className="error">{loginErrors.lastname}</p>
          <ProfilInput
            title="Email"
            type="email"
            value={signUp.email}
            onChange={setEmail}
          />
          <p className="error">{loginErrors.email}</p>
          <ProfilInput
            title="Password"
            type="password"
            value={signUp.password}
            onChange={setPassword}
          />
          <p className="error">{loginErrors.password}</p>

          <div className="auth-actions">
            <button
              onClick={(e) => {
                handleSignUp(e);
              }}
              className="logIn-btn"
            >
              Sign up
            </button>
            <button
              onClick={(e) => {
                goToLogin(e);
              }}
              className="signUp-btn"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
