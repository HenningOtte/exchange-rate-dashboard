import "./ProfilInput.css";

type inputProps = {
  title: string;
  type: string;
};

function ProfilInput({ title }: inputProps) {
  return (
    <div className="profil-input-container">
      <p className="input-label">{title}</p>
      <input type="text" />
    </div>
  );
}

export default ProfilInput;
