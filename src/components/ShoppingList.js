import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [keyWord, setKeyWord] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(event) {
    setKeyWord(event.target.value);
  }

  const itemsToDisplay = items.filter(item => {
    console.log("does " + item.name + " contain " + keyWord);
    console.log(item.name.toLowerCase().includes(keyWord.toLowerCase()));
    if (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(keyWord.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onSearchChange={onSearchChange}
        keyWord={keyWord}
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
