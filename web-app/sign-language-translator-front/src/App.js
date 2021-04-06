import './App.css';
import Navibar from './components/Navibar/Navibar';
import Classifier from './components/classifier/Classifier';
import ClassificationHistory from './components/ClassificationHistory/ClassificationHistory';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navibar />
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Classifier} />
          <Route exact path='/classification-history' component={ClassificationHistory} />
          <Route exact path='*' component={Classifier} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
