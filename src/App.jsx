import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItems";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import Content from "./components/Content";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const api_Url = "http://localhost:3000";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = inputRef.current.value.trim();
    if (newItem) {
      addItem(newItem);
      inputRef.current.value = "";
    }
  };

  const addItem = async (itemText) => {
    const id = Date.now();
    const item = {
      id,
      item: itemText,
      checked: false,
    };
    try {
      const response = await fetch(`${api_Url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(item),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response not ok: ${errorText}`);
      }
      const newItems = [...items, item];
      setItems(newItems);
    } catch (error) {
      console.error("Creating new items", error.message);
    }
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
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
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
