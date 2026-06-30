import "./Profile.css";

function Profile() {
  return (
    <div className="profil">
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
          <button className="edit-btn"></button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
