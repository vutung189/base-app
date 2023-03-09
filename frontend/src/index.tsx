import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./i18n";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { configureStore } from './redux/store';
import reportWebVitals from './reportWebVitals';
// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore({})}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
