import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';
import root from './root.js';

export default () => {
  const app = new App(root);
  app.register(Router);
  app.register(HelmetPlugin);
  return app;
};
