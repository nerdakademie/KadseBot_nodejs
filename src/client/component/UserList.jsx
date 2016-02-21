import React from 'react';
import $ from 'jquery';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';

class UserList extends React.Component {

  constructor() {
    super();
    this.state = {users: []};
  }

  loadUsers() {
    $.getJSON('api/users/', (users) => {
      this.setState({
        users
      });
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  createCard(user) {
    return (
      <Card key={user._id}>
        <CardHeader
          title={user.name}
          subtitle={user.subtitle}
        />
      </Card>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        {this.state.users.map(this.createCard)}
      </div>
    );
  }
}

export default UserList;
