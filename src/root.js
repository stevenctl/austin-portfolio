import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';

import Home from './pages/home.js';
import {ThemeProvider} from '@chakra-ui/core';
import Header from './blocks/header';
import {header, theme} from './config';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';

const root = (
  <ThemeProvider theme={theme}>
    <Helmet>
      <title>Austin Landow - Video Production</title>
      <link rel="stylesheet" href={assetUrl('../static/style.css')} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Sintony&display=swap"
      />
    </Helmet>
    <Header {...header} />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </ThemeProvider>
);

export default root;
