import "./Profile.css";
import ProfileEditForm from "../features/profile/ProfileEditForm";
import { useState, createContext, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoginSignup from "../features/profile/LoginSignup";

type createEditProfilContext = {
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProfilContext = createContext<createEditProfilContext | null>(
  null,
);

function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <ProfilContext value={{ isEditProfileOpen, setIsEditProfileOpen }}>
      <div className={authContext?.isLoggedIn ? "dNone" : ""}>
        <LoginSignup></LoginSignup>
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
