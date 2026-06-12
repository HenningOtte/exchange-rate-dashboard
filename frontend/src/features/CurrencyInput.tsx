import "./CurrencyInput.css";

type InputProps = {
  title: string;
};

function CurrencyInput({ title }: InputProps) {
  return (
    <div className="currency-input-container">
      <p className="currency-label">{title}</p>
      <input className="currency-input" type="number" placeholder="0" />
      <button className="currency-button">
        USD <div className="selector-arrow"></div>
      </button>
    </div>
  );
}

export default CurrencyInput;
