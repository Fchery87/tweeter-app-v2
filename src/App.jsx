import { Container } from 'react-bootstrap';
import './App.css';
import TweetsList from './components/TweetsList';

function App() {
  return (
    <Container className='d-flex flex-column align-items-center'>
      <h1 className='twitter-title'>Twitter App</h1>
      <TweetsList />
    </Container>
  );
}

export default App;
