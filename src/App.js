import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((Number(packedItems) / Number(numItems)) * 100);
  console.log(numItems, packedItems, percentage);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleToggleItem}
      />
      <Stats
        numItems={numItems}
        packedItems={packedItems}
        percentage={percentage}
      />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, package: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onCheckItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <List
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onCheckItem={onCheckItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

function List({ item, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.package}
        onChange={() => {
          onCheckItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} &nbsp;
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ numItems, packedItems, percentage }) {
  return (
    <footer>
      <em>
        {percentage !== 100
          ? `💼 You have ${numItems} item on your list, and you already packed ${packedItems} (${percentage}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
