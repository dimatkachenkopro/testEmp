import React from "react";

const Counter = ({
  min,
  max,
  isBlocked,
  count = 1,
  updateState,
  index,
  pid
}) => {
  return (
    <div>
      <span>Obecnie masz {count} sztuk produktu</span>
      <button
        disabled={isBlocked || count === min}
        onClick={() => updateState(count - 1, index, pid, min)}
      >
        -
      </button>
      <button
        disabled={isBlocked || count === max}
        onClick={() => updateState(count + 1, index, pid, min)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
