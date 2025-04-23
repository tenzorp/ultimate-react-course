function Button({ onClick, children, disabled = false }) {
  return (
    <button className="btn btn-ui" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
