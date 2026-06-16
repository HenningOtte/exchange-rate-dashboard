import "./CurrencyInput.css";

type DateProps = {
  title: string;
  disabled: boolean;
};

function DatePicker({ title, disabled }: DateProps) {
  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input disabled={disabled} type="date" />
    </div>
  );
}

export default DatePicker;
