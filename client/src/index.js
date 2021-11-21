import React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';
import App from './components/App';
import customTheme from './chakra/theme';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
