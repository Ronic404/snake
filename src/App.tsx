import { FC } from 'react';

import Canvas from './components/Canvas';
import Header from './components/Header';
import Settings from './components/Settings';
import StartStop from './components/StartStop';

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <StartStop />
      <Settings />
      <Canvas />
    </div>
  );
}

export default App;
