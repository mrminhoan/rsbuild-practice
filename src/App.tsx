import { useEffect } from 'react';
import './App.css';

const fetchData = async () => {
  fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then(console.log);
};

const App = () => {
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <img src="/images/buttons/btn-action-blue.png" />
      <img src="/images/buttons/btn-reset-filter.png" />
    </div>
  );
};

export default App;
