import React, { useState, useEffect } from 'react';
import ChatBot from './components/ChatBot'
import ItemList from './components/ItemList'
import { getAllAvailableFlights } from './services/backendService';
import './App.css'

function App() {
    const [allItems, setAllItems] = useState([]);

    const fetchItems = async () => {
        try {
            const items = await getAllAvailableFlights();
            setAllItems(items);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

//
  return (
    <div className="app-flex-container">
      <ItemList allItems={allItems}/>
      <ChatBot refreshFlights={fetchItems}/>
    </div>
  )
}

export default App
