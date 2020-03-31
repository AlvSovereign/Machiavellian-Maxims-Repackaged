import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { RootStateInterface } from 'store/store';
import routes from 'routes/routes';
import { Header } from 'components/Header';
import { Modal } from 'components/Modal';
import { Alert } from 'components/Alert';
import { AuthForm } from 'components/AuthForm';
import 'app.scss';

function App() {
  const [fontReady, setFontReady] = useState(false);
  const { alerts } = useSelector((state: RootStateInterface) => state.alert);
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
    <>
      {fontReady && (
        <div className='App'>
          <Router>
            <Header />
            <Route
              exact
              path={routes.maxim.path}
              component={routes.maxim.component}
            />
            <Route
              exact
              path={routes.userProfile.path}
              component={routes.userProfile.component}
            />
            {/* <Route component={routes.invalidPage.component} /> */}
          </Router>
          <Modal>
            <AuthForm />
          </Modal>
          {alerts.length ? <Alert alerts={alerts} /> : null}
        </div>
      )}
    </>
  );
}

export default App;
