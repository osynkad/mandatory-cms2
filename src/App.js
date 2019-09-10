import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  function getSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="App">
      <Header getSearchQuery={getSearchQuery}/>
      <Main searchQuery={searchQuery}/>
    </div>
  );
}

export default App;
