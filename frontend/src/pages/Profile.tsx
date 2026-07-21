import "./Profile.css";
import ProfileEditForm from "../features/profile/ProfileEditForm";
import { useState, createContext, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Login from "../features/profile/Login";
import Signup from "../features/profile/Signup";

type createEditProfilContext = {
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProfilContext = createContext<createEditProfilContext | null>(
  null,
);

function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const authContext = useContext(AuthContext);

  return (
    <ProfilContext value={{ isEditProfileOpen, setIsEditProfileOpen }}>
      <div className={authContext?.isLoggedIn ? "dNone" : ""}>
        {authMode == "login" && <Login setAuthMode={setAuthMode} />}
        {authMode == "signup" && <Signup setAuthMode={setAuthMode} />}
      </div>
      <div className={authContext?.isLoggedIn ? "profil" : "dNone"}>
        <div className={isEditProfileOpen ? "" : "dNone"}>
          <ProfileEditForm></ProfileEditForm>
        </div>

        <div className="profil-card">
          <button
            onClick={() => {
              setIsEditProfileOpen(!isEditProfileOpen);
            }}
            className="edit-btn"
          ></button>
          <div className="profil-header-container">
            <img
              className="profil-header"
              src="./src/assets/backgrounds/standard_background.png"
              alt=""
            />
          </div>
          <div className="profile-info">
            <div className="profil-img-container">
              <img
                className="profil-img"
                src="./src/assets/profil-pic/profil-img-header.png"
                alt="profil-img"
              />
            </div>
            <h3>{authContext?.user.firstname}</h3>
            <span>{authContext?.user.email}</span>
          </div>
        </div>
      </div>
    </ProfilContext>
  );
}

export default Profile;
