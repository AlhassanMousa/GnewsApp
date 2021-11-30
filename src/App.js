import HomePage from './components/homepage';
import Navbar from './components/Navbar';
import { selectSignedIn } from "./features/userSlice";
import { useSelector } from "react-redux";
import './styling/App.css';
import Blogs from './components/Blog';

const App = () => {
 const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="App">
      <Navbar />
      <HomePage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
