import "./CurrencyInput.css";

type DateProps = {
  title: string;
};

function DatePicker({ title }: DateProps) {
  return (
    <div className="currency-input-container date-picker">
      <p className="title-currency">{title}</p>
      <input type="date" />
    </div>
  );
}

export default DatePicker;
