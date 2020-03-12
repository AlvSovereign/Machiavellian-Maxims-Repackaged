import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { store } from './store/store';
import routes from './routes/routes';
import './app.scss';

function App() {
  const [fontReady, setFontReady] = useState(false);

  const loadFonts = async () => {
    const font = new FontFaceObserver('CalendasPlus');
    font.load().then(() => {
      setFontReady(true);
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      {fontReady && (
        <div className='App'>
          <Router>
            <Route
              exact
              path={routes.maxim.path}
              component={routes.maxim.component}
            />
            {/* <Route component={routes.invalidPage.component} /> */}
          </Router>
        </div>
      )}
    </Provider>
  );
}

export default App;
