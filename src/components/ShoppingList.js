import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const emptyForm = {
    name: "",
    category: "Produce",
  };
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setsearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    setsearch(event.target.value);
  }

  function onItemFormSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      ...formData,
    };
    setItems([...items, newItem]);
    setFormData(emptyForm);
  }

  const itemsToDisplay = items.filter(item => {
    // console.log("does " + item.name + " contain " + search);
    // console.log(item.name.toLowerCase().includes(search.toLowerCase()));
    if (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onSearchChange={onSearchChange}
        search={search}
      />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
