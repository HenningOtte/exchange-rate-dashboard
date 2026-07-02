import "./Profile.css";
import ProfileEditForm from "../features/profile/ProfileEditForm";
import { useEffect, useState, createContext } from "react";

type createEditProfilContext = {
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProfilContext = createContext<createEditProfilContext | null>(
  null,
);

function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <ProfilContext value={{ isEditProfileOpen, setIsEditProfileOpen }}>
      <div className="profil">
        <div className={isEditProfileOpen ? "" : "dNone"}>
          <ProfileEditForm></ProfileEditForm>
        </div>

        <div className="profil-card">
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
            <h3>Max Mustermann</h3>
            <span>MaxMustermann@gmail.com</span>
            <button
              onClick={() => {
                setIsEditProfileOpen(!isEditProfileOpen);
              }}
              className="edit-btn"
            ></button>
          </div>
        </div>
      </div>
    </ProfilContext>
  );
}

export default Profile;
