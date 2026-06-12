import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  return (
    <div className="converterCard max-w-512">
      <h2>{title}</h2>
      <div className="value-container">
        <CurrencyInput title="Initial value"></CurrencyInput>
        <CurrencyInput title="Target value"></CurrencyInput>
      </div>
      <div className="historic-container">
        <DatePicker title="Date"></DatePicker>
        <Switch defaultChecked size="small" />
      </div>
    </div>
  );
}

export default Card;
