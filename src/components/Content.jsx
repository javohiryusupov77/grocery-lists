import ItemList from "./ItemsList";

const Content = ({ items }) => {
  return (
    <>
      {items.length ? (
        <ItemList items={items} />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
