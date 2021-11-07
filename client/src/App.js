import './App.scss';
import DialPad from './Components/DialPad/DiaPad.js';
import Header from './Components/Header/Header.js';
import UserInfor from './Components/UserInfor/UserInfor.js';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function App() {
  
  const index = useSelector(state => state.index);

  useEffect(() => {
    console.log(window.navigator.appVersion);
  }, [])

  return (
    <div className="App">
      <Header />
      {index == 0?
        <DialPad /> :
        <UserInfor />
      }     
    </div>
  );
}
export default App;
