/************************************************************ IMPORTS ************************************************************/

import App from './App';
import './styles/index.css';
import '@fontsource/roboto';
import '@radix-ui/themes/styles.css';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';

/************************************************************ IMPORTS ************************************************************/

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Theme>
    <App />
  </Theme>,
);
