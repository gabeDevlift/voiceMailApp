import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.state = {disabled: true};
        this.attempt = '';
        this.correct = '4169381605';
    }

    // TODO: put styles in separate file
    // improve the keyboard (currently a separate package)
    // maybe improve the layout of the input box
    render() {
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 40 }}>
            <Text style={{paddingBottom: 20, fontSize: 26}}>Welcome Back.</Text>
            <Text style={{paddingBottom: 10, color: "grey"}}>Please enter your phone number:</Text>
            <View style={{flexDirection:"row", height: 40, width: 250, borderRadius:20, borderColor: 'grey', borderWidth: 1}}>
                <Text style={{height: 40, width: 50, lineHeight: 38, textAlign: "center"}}>
                    +1  |
                </Text>
	        	<Text style={{height: 40, width: 180, textAlign: "left", lineHeight: 38}}>
                    {this.state.text}
                </Text>
	        </View>
            <VirtualKeyboard color='grey' pressMode='string' onPress={(val) => this.handleInput(val)}/>
            <View style={{paddingTop: 30}}> 
                <Button title="Continue" disabled={this.state.disabled} onPress={() => this.pseudoAuth()}/>
            </View>
        </View>
        
        );
    }

    handleInput(input) {
        this.setState((state) => {
            this.attempt = input;
            return{text: input}
        });
        // if(phoneNum.length <= 10){
        //     this.setState({text: phoneNum});
        // }

        //only allow user to continue
        //if the size of the string inputted >= 10 (canadian phone number)
        this.setState({disabled: input.length < 10 ? true : false});
    }

    pseudoAuth() {
        if(this.attempt == this.correct){
            this.props.navigation.navigate('EnterPassCode');
        }
        else{
            console.log("wrong phone number!");
        }
    }
}
