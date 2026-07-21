import "./ProfilInput.css";

type inputProps = {
  title: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ProfilInput({ title, type, value, onChange }: inputProps) {
  return (
    <div className="profil-input-container">
      <p className="input-label">{title}</p>
      <input
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        type={type}
      />
    </div>
  );
}

export default ProfilInput;
