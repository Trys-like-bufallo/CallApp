import './App.scss';
import DialPad from './Components/DialPad/DiaPad.js';
import {Provider} from 'react-redux';
import store from './Redux/Store.js';

function App() {
  

  return (
    <Provider store = {store}>
      <div className="App">
        <div className="Menu">

        </div>
        <DialPad />      

      </div>
    </Provider>
  );
}
export default App;
