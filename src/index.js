import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css'; // postCSS import of CSS module

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Terrible, terrible hack :(
// MapQuest breaking in strict mode javascript, so we need to inject the libs
// programmatically.
let js = document.createElement("script");
js.type = "text/javascript";
js.src = '../lib/mq-map.js';
document.body.appendChild(js);
js.onload = () => {
  let js2 = document.createElement("script");
  js2.type = "text/javascript";
  js2.src = "../lib/mq-routing.js";
  document.body.appendChild(js2);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
