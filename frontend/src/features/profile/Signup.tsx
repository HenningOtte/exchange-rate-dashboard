import InputField from "../../components/InputField";
import { useState, useEffect } from "react";
import { postRegister } from "../../api/authApi";
import type { RegisterSuccess } from "../../api/authApi";
import "./Signup.css";

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

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
      setAuthMode("login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [showSuccess]);

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

  function handleErrors(errors: RegisterSuccess[]) {
    if (errors.length === 0) return;
    if (errors[0].success) {
      setShowSuccess(true);
    }

    let updatedErrors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };

    if (errors[0].success) {
      return;
    }

    setLoginErrors(() => {
      errors.forEach((error) => {
        if (error.path == "firstname") updatedErrors.firstname = error.msg;
        if (error.path == "lastname") updatedErrors.lastname = error.msg;
        if (error.path == "email") updatedErrors.email = error.msg;
        if (error.path == "password") updatedErrors.password = error.msg;
      });

      return updatedErrors;
    });
  }

  return (
    <div className="signUp">
      <div className={showSuccess ? "success-container" : "dNone"}>
        <div className="success-card">Login was successfull</div>
      </div>
      <div className="signUp-card">
        <h3>Sign up</h3>

        <form className="signUp-form" action="#">
          <InputField
            title="First Name"
            type="text"
            value={signUp.firstname}
            placeholder=""
            onChange={setFirstName}
          />
          <p className="error">{loginErrors.firstname}</p>
          <InputField
            title="Last Name"
            type="text"
            value={signUp.lastname}
            placeholder=""
            onChange={setLastName}
          />
          <p className="error">{loginErrors.lastname}</p>
          <InputField
            title="Email"
            type="email"
            value={signUp.email}
            placeholder=""
            onChange={setEmail}
          />
          <p className="error">{loginErrors.email}</p>
          <InputField
            title="Password"
            type="password"
            value={signUp.password}
            placeholder=""
            onChange={setPassword}
          />
          <p className="error">{loginErrors.password}</p>

          <div className="signUp-actions">
            <button
              onClick={(e) => {
                handleSignUp(e);
              }}
              className="btn btn-primary"
            >
              Sign up
            </button>
            <button
              onClick={(e) => {
                goToLogin(e);
              }}
              className="btn btn-secondary"
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
