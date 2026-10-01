import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";
import type { ExchangeState } from "../../types/exchangeState";
import { createExchangeState } from "../../types/exchangeState";
import { useContext } from "react";
import { NewExchangeContext } from "../../context/ExchangeContext";
import { ValidationContext } from "../../context/ValidationProvider";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  const validationContext = useContext(ValidationContext);

  const exchangeContext = useContext(NewExchangeContext);
  const isDisabled = exchangeContext?.exchange.converter.isHistorical
    ? false
    : true;

  if (validationContext === null) {
    throw new Error("ValidationContext is missing");
  }

  const updateFavoriteName = (e: React.InputEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    exchangeContext?.setActiveFavoriteName(input.value);
  };

  return (
    <div className="converter-card max-w-512">
      <h2>{title}</h2>
      <div className="favorite-name-field">
        <div className="favorite-name-container">
          <p className="favorite-label">Name</p>
          <input
            value={exchangeContext?.activeFavoriteName}
            onInput={(e) => {
              updateFavoriteName(e);
            }}
            onClick={() => {
              validationContext?.setValidationErrors({
                favoriteName: null,
                initialValue: validationContext.validationErrors.initialValue,
                targetValue: validationContext.validationErrors.targetValue,
              });
            }}
            id="favoriteName"
            className="favorite-name-input"
            type="text"
            maxLength={30}
          />
        </div>
        <div className="errorMessage-conatiner">
          {validationContext?.validationErrors.favoriteName && (
            <span>{validationContext?.validationErrors.favoriteName}</span>
          )}
        </div>
      </div>
      <div className="currency-inputs">
        <CurrencyInput
          title="Initial value"
          id="initialValue"
          validationError={validationContext.validationErrors.initialValue}
        ></CurrencyInput>
        <CurrencyInput
          title="Target value"
          id="targetValue"
          validationError={validationContext.validationErrors.targetValue}
        ></CurrencyInput>
      </div>
      <div className="date-controls">
        <DatePicker
          title="Date"
          disabled={isDisabled}
          id="dateHistorical"
        ></DatePicker>
        <Switch
          checked={exchangeContext?.exchange.converter.isHistorical}
          onClick={() => {
            if (!exchangeContext) return;

            exchangeContext.setExchangeState((exchange) => {
              const exchangeViewState: ExchangeState =
                createExchangeState(exchange);
              exchangeViewState.converter.isHistorical =
                !exchange.converter.isHistorical;

              return exchangeViewState;
            });
          }}
          size="small"
        />
      </div>
    </div>
  );
}

export default Card;
