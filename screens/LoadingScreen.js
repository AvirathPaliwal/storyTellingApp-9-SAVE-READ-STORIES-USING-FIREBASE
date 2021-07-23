import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        //returns user that has logged in
     firebase.auth().onAuthStateChanged((user) =>{
       if(user){
         this.props.navigation.navigate('DashboardScreen')
       }
       else{
        this.props.navigation.navigate('LoginScreen');
       }     
     })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>LoadingScreen</Text>
            </View>
        )
    }
}