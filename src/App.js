
import './App.css';
import AddToList from './components/AddToList';
import List from './components/List';
import GlobalProvider from './context/GlobalProvider';

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <AddToList />
        <List />
      </div>
    </GlobalProvider>
  );
}

export default App;
