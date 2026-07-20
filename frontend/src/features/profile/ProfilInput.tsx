import "./ProfilInput.css";

type inputProps = {
  title: string;
  type: string;
};

function ProfilInput({ title, type }: inputProps) {
  return (
    <div className="profil-input-container">
      <p className="input-label">{title}</p>
      <input type={type} />
    </div>
  );
}

export default ProfilInput;
