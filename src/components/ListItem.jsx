import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ListItem = ({ item, onToggle, onDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => onToggle(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => onDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default ListItem;
