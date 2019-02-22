import { useState } from "react";

export default ({ initialName }) => {
  const [name, setName] = useState(initialName);

  return (
    <div className="name">
      <input 
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};