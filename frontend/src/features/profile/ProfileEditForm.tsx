import "./ProfileEditForm.css";
import { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { AuthContext } from "../../context/AuthProvider";

type editMode = {
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileEditForm({
  isEditProfileOpen,
  setIsEditProfileOpen,
}: editMode) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (isEditProfileOpen) {
      setIsCardOpen(true);
    } else {
      const timer = setTimeout(() => {
        setIsCardOpen(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isEditProfileOpen]);

  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    newPassword: "",
    currentPassword: "",
  });

  const [userFormErrors, setUserFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    newPassword: "",
    currentPassword: "",
  });

  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setUserFormData((data) => {
      const userData = {
        firstname: userInput,
        lastname: data.lastname,
        email: data.email,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      };

      return userData;
    });
  };

  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setUserFormData((data) => {
      const userData = {
        firstname: data.firstname,
        lastname: userInput,
        email: data.email,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      };

      return userData;
    });
  };

  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setUserFormData((data) => {
      const userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: userInput,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      };

      return userData;
    });
  };

  const setNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setUserFormData((data) => {
      const userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        newPassword: userInput,
        currentPassword: data.currentPassword,
      };

      return userData;
    });
  };

  const setCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setUserFormData((data) => {
      const userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        newPassword: data.newPassword,
        currentPassword: userInput,
      };

      return userData;
    });
  };

  const saveUserData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    profilContext?.setIsEditProfileOpen(!profilContext.isEditProfileOpen);
  };

  return (
    <div
      className={isCardOpen ? "profileEdit" : "profileEdit profileEdit-hide"}
    >
      <div
        className={
          isCardOpen ? "profileEditCard" : "profileEditCard profilCard-hide"
        }
      >
        <button
          className="close-btn"
          onClick={() => {
            setIsEditProfileOpen(false);
          }}
        ></button>
        <img
          className="profilEditPicture"
          src="./src/assets/profil-pic/profil-img-header.png"
          alt=""
        />
        <form className="profileEditForm" action="">
          <div className="profil-name-container">
            <div>
              <InputField
                title={"Firstname"}
                type={"text"}
                value={userFormData.firstname}
                placeholder={
                  authContext?.user.firstname ? authContext.user.firstname : ""
                }
                onChange={setFirstName}
              ></InputField>
              <p className="error">{userFormErrors.firstname}</p>
            </div>
            <div>
              <InputField
                title={"Lastname"}
                type={"text"}
                value={userFormData.lastname}
                placeholder={
                  authContext?.user.lastname ? authContext.user.lastname : ""
                }
                onChange={setLastName}
              ></InputField>
              <p className="error">{userFormErrors.lastname}</p>
            </div>
          </div>
          <InputField
            title={"Email"}
            type={"email"}
            value={userFormData.email}
            placeholder={authContext?.user.email ? authContext.user.email : ""}
            onChange={setEmail}
          ></InputField>
          <p className="error">{userFormErrors.email}</p>
          <InputField
            title={"Current Password"}
            type={"password"}
            value={userFormData.currentPassword}
            placeholder=""
            onChange={setCurrentPassword}
          ></InputField>
          <p className="error">{userFormErrors.currentPassword}</p>
          <InputField
            title={"New Password"}
            type={"password"}
            value={userFormData.newPassword}
            placeholder=""
            onChange={setNewPassword}
          ></InputField>
          <p className="error">{userFormErrors.newPassword}</p>
          <div>
            <button
              className="profil-submit-btn"
              onClick={(e) => {
                saveUserData(e);
              }}
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditForm;
