import React from 'react';
import './App.css';
import Header from './lib/components/Header';
import Home from './lib/pages/Home';

const App: React.FC = () => (
  <>
    <Header />
    <Home />
  </>
);

export default App;
