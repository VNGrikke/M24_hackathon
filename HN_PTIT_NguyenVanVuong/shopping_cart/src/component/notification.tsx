
interface NotificationProps {
  message: string;
  type: "success" | "warning" | "danger";
}

export default function Notification({ message, type }: NotificationProps) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}
