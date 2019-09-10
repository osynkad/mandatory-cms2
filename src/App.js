import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className="App">
      <Header setCheckbox={setCheckbox} setSearchQuery={setSearchQuery}/>
      <Main checkbox={checkbox} searchQuery={searchQuery}/>
    </div>
  );
}

export default App;
