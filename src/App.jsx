import { Container } from 'react-bootstrap';
import './App.css';
import TweetsList from './components/TweetsList';
import silverbackLogo from './assets/silverback_top_banner.png';

function App() {
  return (
    <Container className='d-flex flex-column align-items-center'>
      <img src={silverbackLogo} alt="Silverback Chats" className="logo" />
      <TweetsList />
    </Container>
  );
}

export default App;

