import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItems = ({ newItem,setNewItem,handleSubmit }) => {
  const inputRef = useRef(null);


  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button type="submit" aria-label="Add Item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItems;
