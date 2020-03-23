import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/store';
import routes from 'routes/routes';
import { Header } from 'components/Header';
import { Modal } from 'components/Modal';
import 'app.scss';

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
      <PersistGate loading={null} persistor={persistor}>
        {fontReady && (
          <div className='App'>
            <Header />
            <Router>
              <Route
                exact
                path={routes.maxim.path}
                component={routes.maxim.component}
              />
              {/* <Route component={routes.invalidPage.component} /> */}
            </Router>
            <Modal />
          </div>
        )}
      </PersistGate>
    </Provider>
  );
}

export default App;
