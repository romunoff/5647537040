import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { mainTheme } from './styles/themes/mainTheme';
import { HomeContainer } from './features/Home/HomeContainer/HomeContainer';
import { Provider } from 'react-redux';
import { store } from './app-configs/config-store';
import { ProcessContainer } from './features/Process/ProcessContainer/ProcessContainer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createTheme(mainTheme)}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeContainer />} />
            <Route path='/process' element={<ProcessContainer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
