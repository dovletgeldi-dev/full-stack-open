// eslint-disable-next-line react/prop-types
export default function Notifications({ message, isSuccess }) {
  if (message === null) {
    return null;
  }

  return (
    <>
      {isSuccess ? (
        <div className="success">{message}</div>
      ) : (
        <div className="error">{message}</div>
      )}
    </>
  );
}
