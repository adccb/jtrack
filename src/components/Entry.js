import { useState } from "react";
import { useDataPoints } from "../hooks/useDataPoints";

export const Entry = ({ tag, note, timestamp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note);
  const { editDataPoint, removeDataPoint } = useDataPoints();

  const toggleIsEditing = () => {
    if (!isEditing) setIsEditing(true);
    else {
      editDataPoint(timestamp, editText);
      setIsEditing(false);
    }
  };

  return (
    <li key={timestamp} onClick={toggleIsEditing}>
      <span>
        {new Date(timestamp).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
      </span>
      <span>{tag}</span>{" "}
      {isEditing ? (
        <>
          <label htmlFor={`edit-${timestamp}`}>edit</label>
          <input
            id={`edit-${timestamp}`}
            onClick={(e) => e.stopPropagation()}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button onClick={() => removeDataPoint(timestamp)}>delet this</button>
        </>
      ) : (
        <span>{`(${note})`}</span>
      )}
    </li>
  );
};
