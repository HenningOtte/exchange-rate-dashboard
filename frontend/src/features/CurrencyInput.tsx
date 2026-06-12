import "./CurrencyInput.css";

type InputProps = {
  title: string;
};

function CurrencyInput({ title }: InputProps) {
  return (
    <div className="currency-input-container">
      <p className="title-currency">{title}</p>
      <input className="currency-input" type="number" placeholder="0" />
      <button className="btn-currencies">
        USD <div className="arrow"></div>
      </button>
    </div>
  );
}

export default CurrencyInput;
