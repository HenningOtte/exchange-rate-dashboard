import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";
import { useState } from "react";

import { useContext } from "react";
import { ThemeContext } from "../App.tsx";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(true);

  const setShowDatePicker = () => {
    setIsDatePickerDisabled(!isDatePickerDisabled);
  };

  let ctx = useContext(ThemeContext);

  return (
    /*
    <div className="converter-card max-w-512">
      <h2>{title}</h2>
      <div className="currency-inputs">
        <CurrencyInput title="Initial value"></CurrencyInput>
        <CurrencyInput title="Target value"></CurrencyInput>
      </div>
      <div className="date-controls">
        <DatePicker title="Date" disabled={isDatePickerDisabled}></DatePicker>
        <Switch onClick={setShowDatePicker} defaultChecked size="small" />
      </div>
    </div>
    */

    <button
      onClick={() => {
        console.log(ctx?.theme);
        ctx?.setTheme((i) => {
          return i == "light on" ? "light off" : "light on";
        });
      }}
    >
      {ctx?.theme}
    </button>
  );
}

export default Card;
