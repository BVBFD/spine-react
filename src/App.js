import './App.css';
import React, { useEffect, useState } from 'react';
import { LoadSpineAnimation, SpineCanvasRenderer } from './spine';

const App = (props) => {
  const [spineData, setSpineData] = useState();

  useEffect(() => {
    setSpineData(
      LoadSpineAnimation(
        'spineboy',
        '../assets/spineboy/',
        'spineboy.atlas',
        'spineboy-ess.json'
      )
    );
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {SpineCanvasRenderer('spineboy', {
        width: '20rem',
        height: '20rem',
        background: 'transparent',
      })}
    </div>
  );
};

export default App;
