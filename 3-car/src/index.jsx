import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Scene from './Scene';
import { useGLTF } from '@react-three/drei';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Scene />
  </React.StrictMode>
);
useGLTF.preload('/assets/models/car_taxi.glb')
useGLTF.preload('/assets/models/ball.glb')
useGLTF.preload('/assets/models/tree.glb')