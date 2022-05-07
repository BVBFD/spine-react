import './App.css';
import React, { useEffect } from 'react';
import { SpineCanvasRenderer, LoadSpineAnimation } from './spine';

const App = (props) => {
  useEffect(() => {
    LoadSpineAnimation('../assets/', 'spineboy.atlas', 'spineboy-ess.json');
  }, []);

  return (
    <div>
      {SpineCanvasRenderer({
        width: '100%',
        height: '100vh',
        background: '#333',
      })}
    </div>
  );
};

export default App;
