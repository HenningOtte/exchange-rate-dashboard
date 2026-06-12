import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  return (
    <div className="converter-card max-w-512">
      <h2>{title}</h2>
      <div className="currency-inputs">
        <CurrencyInput title="Initial value"></CurrencyInput>
        <CurrencyInput title="Target value"></CurrencyInput>
      </div>
      <div className="date-controls">
        <DatePicker title="Date"></DatePicker>
        <Switch defaultChecked size="small" />
      </div>
    </div>
  );
}

export default Card;
