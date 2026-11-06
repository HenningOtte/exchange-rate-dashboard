import { createContext } from "react";

type NotificationContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
