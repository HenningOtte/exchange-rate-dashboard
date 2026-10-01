import { useState, createContext } from "react";

export type ValidationErrors = {
  favoriteName: string | null;
  initialValue: string | null;
  targetValue: string | null;
};

type ValidationContextValue = {
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
};

export const ValidationContext = createContext<null | ValidationContextValue>(
  null,
);

function ValidationProvider({ children }: { children: React.ReactNode }) {
  const [validationErrors, setValidationErrors] = useState({
    favoriteName: null as string | null,
    initialValue: null as string | null,
    targetValue: null as string | null,
  });

  return (
    <ValidationContext value={{ validationErrors, setValidationErrors }}>
      {children}
    </ValidationContext>
  );
}

export default ValidationProvider;
