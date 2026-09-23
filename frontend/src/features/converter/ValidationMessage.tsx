import "./ValidationMessage.css";

type ErrorMessage = {
  validationMessage: string | null;
};

function ValidationMessage({ validationMessage }: ErrorMessage) {
  return (
    <div className="errorMessage-conatiner">
      {validationMessage && <span>{validationMessage}</span>}
    </div>
  );
}

export default ValidationMessage;
