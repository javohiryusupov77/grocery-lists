import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItems";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import Content from "./components/Content";
import ListItem from "./components/ListItem";


function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const api_Url = "http://localhost:3011";

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${api_Url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error not ok: ${errorText}`);
        }
        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  async function AddItems() {
    const id = Date.now().toString();
    const item = {
      id,
      item: newItem,
      checked: false,
    };
    try {
      const response = await fetch(`${api_Url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response not ok: ${errorText}`);
      }
      const newItems = [...items, item];
      setItems(newItems);
      setNewItem("")
    } catch (error) {
      console.error("Creating new items", error.message);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    AddItems();
  }
  const deleteItem = async (id) => {
    console.log();
    console.log(id, "deleteItem id");
    try {
      const response = await fetch(`${api_Url}/items/${id}`, {
        method: 'DELETE',
        headers:{
          'content-Type': 'application/json'
        }
      });
      console.log(response);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response not ok: ${errorText}`);
      }
      setItems((Items) => Items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Deleting item", error);
    }
  };
  
  const handleCheck = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    const updatedItem = updatedItems.find((item) => item.id === id);

    try {
      const response = await fetch(`${api_Url}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: updatedItem.checked }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response not ok: ${errorText}`);
      }
    } catch (error) {
      console.error("Updating item", error);
    }
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} onSearch={setSearch} />
      <main>
        {isLoading && <p>Loading</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={deleteItem}
          />
        )}
      </main>
      <div></div>
      <Footer />
    </div>
  );
}

export default App;
