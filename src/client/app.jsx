import './style/main.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import React from 'react';
import ReactDOM from 'react-dom';

injectTapEventPlugin();

let root = document.getElementById('app');
if (!root) {
  root = document.body;
}

ReactDOM.render(<LeftNav open="true" />, root);