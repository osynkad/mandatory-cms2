import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Details from './components/Details';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const MainPage = (props) => {
    return (
      <Main 
        checkbox={checkbox} 
        searchQuery={searchQuery}
        {...props}
      />
    );
  }

  return (
    <Router>
      <div className="App">
        <Header setCheckbox={setCheckbox} setSearchQuery={setSearchQuery}/>
        <main className={styles.main}>
          <Route exact path="/" render={() => <Redirect to="/products/page-1"/>} />
          <Route path="/products/page-:page" render={MainPage}/>
          <Route path="/details/:product" component={Details}/> 
        </main>
      </div>
    </Router>
  );
}

export default App;
