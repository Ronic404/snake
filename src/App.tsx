import { FC } from 'react';

import Canvas from './components/Canvas';
import Header from './components/Header';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Canvas />
    </div>
  );
}

export default App;
