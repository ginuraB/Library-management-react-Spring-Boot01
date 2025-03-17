export const SpinnerLoading = () => {
  return (
    <div className="d-flex m-5 justify-content-center" style={{ height: 550 }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
