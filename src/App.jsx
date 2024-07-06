import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import TweetsList from './components/TweetsList';
// import silverbackLogo from './assets/silverback_top_banner.png';
import './App.css';
import './index.css';

function App() {
  return (
    <div>
      <Header />
      <Container className="d-flex flex-column align-items-center">
        {/* <img src={silverbackLogo} alt="Silverback Chats" className="logo" /> */}
        <TweetsList />
      </Container>
    </div>
  );
}

export default App;
