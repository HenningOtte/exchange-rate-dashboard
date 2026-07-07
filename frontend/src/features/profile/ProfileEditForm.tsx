import "./ProfileEditForm.css";
import { ProfilContext } from "../../pages/Profile";
import { useContext, useState } from "react";
import ProfilInput from "./ProfilInput";

function ProfileEditForm() {
  const profilContext = useContext(ProfilContext);

  return (
    <div className="profileEdit">
      <div
        className={
          profilContext?.isEditProfileOpen
            ? "profileEditCard"
            : "profileEditCard profilCard-hide"
        }
      >
        <button
          className="close-btn"
          onClick={() => {
            profilContext?.setIsEditProfileOpen(
              !profilContext.isEditProfileOpen,
            );
          }}
        ></button>
        <img
          className="profilEditPicture"
          src="./src/assets/profil-pic/profil-img-header.png"
          alt=""
        />
        <form className="profileEditForm" action="">
          <div className="profil-name-container">
            <ProfilInput title={"Firstname"} type={"text"}></ProfilInput>
            <ProfilInput title={"Lastname"} type={"text"}></ProfilInput>
          </div>
          <ProfilInput title={"Email"} type={"email"}></ProfilInput>
          <ProfilInput title={"Country"} type={"text"}></ProfilInput>
          <button
            className="profil-submit-btn"
            onClick={() => {
              profilContext?.setIsEditProfileOpen(
                !profilContext.isEditProfileOpen,
              );
            }}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditForm;
