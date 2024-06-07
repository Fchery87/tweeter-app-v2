import { Container } from 'react-bootstrap';
import './App.css';
import TweetsList from './components/TweetsList';
import logo from './assets/silverback.png'; // Import the image

function App() {
  return (
    <Container className='d-flex flex-column align-items-center'>
      <img src={logo} alt="SilverBack Chats" className="logo" />
      <TweetsList />
    </Container>
  );
}

export default App;
