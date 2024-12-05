import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import AppRoutes from './AppRoutes.jsx';

const App = () => {
  
  return (

  <Provider store={ store }>
   <BrowserRouter>
    <AppRoutes />
   </BrowserRouter>
   </Provider>
  );
}

export default App;
