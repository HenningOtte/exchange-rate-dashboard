import { useState, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
import "./NotificationProvider.css";

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!showNotification) return;

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showNotification]);

  return (
    <NotificationContext
      value={{ message, setMessage, showNotification, setShowNotification }}
    >
      {showNotification && (
        <div className="save-message-container">
          <div className="save-message">{message}</div>
        </div>
      )}
      {children}
    </NotificationContext>
  );
}

export default NotificationProvider;
