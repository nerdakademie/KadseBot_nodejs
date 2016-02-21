import '../style/login.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import debug from 'debug';
import TextField from 'material-ui/lib/text-field';

import injectTapEventPlugin from 'react-tap-event-plugin';

class LoginForm extends React.Component {

  constructor() {
    super();
  }

  checkLogin(e) {
    e.preventDefault();
    $.post("api/login", {username: $('#user').val(), password: $('#pass').val()}, function(data) {
      if(data.success) {
        location.reload();
      } else {

      }
    });
  }

  render() {
    return (
      <div>
        <hgroup>
          <h1>KadseBot - Login</h1>
          <h3>By NSA</h3>
        </hgroup>
        <form id="form" method="post">
          <div className="group">
            <TextField id="user" floatingLabelText="NAK Benutzername" />
          </div>
          <div className="group">
            <TextField id="pass" floatingLabelText="NAK Passwort" />
          </div>
          <button onClick={this.checkLogin} type="button" className="button buttonBlue">Login
            <div className="ripples buttonRipples"><span className="ripplesCircle"></span></div>
          </button>
        </form>
      </div>
    );
  }
}

injectTapEventPlugin();

let root = document.getElementById('app');
if (!root) {
  root = document.body;
}

ReactDOM.render(<LoginForm />, root);
