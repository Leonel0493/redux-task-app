import React from "react";

function Label({ labelFor, labelText }) {
  return (
    <label htmlFor={labelFor} className="block text-sm font-bold">
      {labelText}
    </label>
  );
}

export default Label;
