import "./InputField.css";

type inputProps = {
  title: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ title, type, value, placeholder, onChange }: inputProps) {
  return (
    <div className="profil-input-container">
      <p className="input-label">{title}</p>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        type={type}
      />
    </div>
  );
}

export default InputField;
