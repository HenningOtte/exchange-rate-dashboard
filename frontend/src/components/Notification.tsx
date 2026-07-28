import "./Notification.css";

type NotificationProps = {
  message: string;
  visible: boolean;
};

function Notification({ message, visible }: NotificationProps) {
  return (
    <div>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
