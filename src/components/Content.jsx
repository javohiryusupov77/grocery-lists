import ItemList from "./ItemsList";

const Content = ({ items, handleCheck, handleDelete }) => {
  console.log(items,'contectpage');
  console.log(handleDelete);
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
