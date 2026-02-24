import React from 'react';
import './index.css';

import { Provider } from 'react-redux';
import Store from './store/store';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './App';
import ReactDOM from 'react-dom/client';
import ChatBot from './components/chatbot/Chatbot';
import ScrollToTop from './utils/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
        <ChatBot />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
