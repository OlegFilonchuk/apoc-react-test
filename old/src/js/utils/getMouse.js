const getMouse = (e, container) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return {
    x,
    y
  };
};

export default getMouse;
