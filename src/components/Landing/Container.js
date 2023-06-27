const Container = ({ children, xpadded, ypadded }) => {
  return (
    <div
      className={`${xpadded && "px-7 max-w-screen-xl mx-auto"} ${
        ypadded && "py-20"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
