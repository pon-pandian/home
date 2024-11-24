import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoute'
import { store } from './redux/store/store'

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
        <AppRoute/>
        </BrowserRouter>
       </Provider> 
   );
  }
}

export default App;
