import './App.scss';
import DialPad from './Components/DialPad/DiaPad.js'
import Auth from './Components/Auth/Auth.js';
import {useSelector, useDispatch} from 'react-redux';

function App({socket}) {
    const login = useSelector(state => state.login);
    return (
        <div className="App">
          {login ?
            <DialPad socket = {socket} /> :
            <Auth />
          }
        </div>
    );
}
export default App;
