import "./CurrencyInput.css";

type DateProps = {
  title: string;
};

function DatePicker({ title }: DateProps) {
  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input type="date" />
    </div>
  );
}

export default DatePicker;
