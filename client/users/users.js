import React, { Fragment, Component }  from 'react';
// import './users.css';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Image, Button
} from 'react-native';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    // return fetch('https://192.168.1.10:3000/api/users')
    // .then(res => res.json())
    // .then(users => this.setState({users}))
    // .catch((error) => {console.log(error);})
    return fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        return json.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Users </Text>
          {this.state.users.map(user => 
            <Text> {user.first_name} </Text>
            )}
        </View>
    );
  }
}

export default Users;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});