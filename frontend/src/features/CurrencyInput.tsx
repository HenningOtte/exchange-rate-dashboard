import "./CurrencyInput.css";
import type { ExchangeState } from "../types/exchangeState";
import { createExchangeState } from "../types/exchangeState";
import { useEffect, useRef, useState } from "react";

import { useContext } from "react";
import { ExchangeContext } from "../pages/Home.tsx";

type InputProps = {
  title: string;
  id: string;
};

function CurrencyInput({ title, id }: InputProps) {
  let exchangeContext = useContext(ExchangeContext);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const setCurrency = (currency: string) => {
    exchangeContext?.setExchangeState((stateObj) => {
      let newState = createExchangeState(stateObj);

      id === "initialValue"
        ? (newState.converter.sourceCurrency = currency)
        : (newState.converter.targetCurrency = currency);

      return newState;
    });

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpen]);

  return (
    <div className="currency-input-container">
      <p className="currency-label">{title}</p>
      <input
        id={id}
        onInput={(e) => {
          let inputValue = e.currentTarget.value;

          if (id === "initialValue") {
            exchangeContext?.setExchangeState((exchange) => {
              const exchangeViewState: ExchangeState =
                createExchangeState(exchange);
              exchangeViewState.converter.initialValue = inputValue;
              return exchangeViewState;
            });
          }
        }}
        className="currency-input"
        type="number"
        placeholder="0"
      />
      <div className="currency-selection-container">
        <button
          onClick={() => {
            setIsOpen((state) => {
              let newState: boolean = !state;
              return newState;
            });
          }}
          className="currency-button"
        >
          <p>
            {id == "initialValue"
              ? exchangeContext?.exchangeState.converter.sourceCurrency
              : exchangeContext?.exchangeState.converter.targetCurrency}
          </p>
          <div className="selector-arrow"></div>
        </button>
        {isOpen && (
          <div ref={dropdownRef} className="currencySelection">
            <button
              onClick={() => {
                setCurrency("USD");
              }}
            >
              USD
            </button>
            <div className="divider"></div>
            <button
              onClick={() => {
                setCurrency("EUR");
              }}
            >
              EUR
            </button>
            <div className="divider"></div>
            <button
              onClick={() => {
                setCurrency("GBP");
              }}
            >
              GBP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencyInput;
