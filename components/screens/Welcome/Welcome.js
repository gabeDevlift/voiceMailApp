import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import SplashScreen from 'react-native-splash-screen'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            alert: "Please enter your phone number: ",
            disabled: true
        };
        this.input = '';
        this.invalid = false;
        this.attempt = '';
        this.correct = '4169381605';
        this.wait = this.wait.bind(this);
        this.animatedText = this.getAnimatedText.bind(this);
        this.shakeAnimation = new Animated.Value(0);
    }

    //called on invalid authentication
    showErrorAnimation() {
      this.shakeAnimation.setValue(0);
      Animated.timing(this.shakeAnimation, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear
      }).start();
    }

    //function to inject animated text tag into view port
    getAnimatedText() {
            const shake = this.shakeAnimation.interpolate({
                inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                outputRange: [0, -10, 10, -10, 10, -10, 0]
            });
            return (
                <Animated.Text style={[this.invalid ? styles.red : styles.grey, {marginLeft: shake}]}>
                {this.state.alert}
                </Animated.Text>    
          )
      return animatedText;
    }

    wait(ms)
    {
        var d = new Date();
        var d2 = null;
        do { d2 = new Date(); }
        while(d2-d < ms);
    }

    componentDidMount() {
        // SplashScreen.hide();
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    setValue = () => {
        console.log(this.input)
    }

    // TODO: put styles in separate file
    // improve the keyboard (currently a separate package)
    // maybe improve the layout of the input box
    render() {

        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 40 }}>
            <Text style={{paddingBottom: 20, fontSize: 26}}>Welcome Back.</Text>
            {this.getAnimatedText()}
            <View style={{flexDirection:"row", height: 40, width: 250, borderRadius:20, borderColor: 'grey', borderWidth: 1, paddingLeft: 10}}>
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

    //handler for keyboard input
    handleInput(input) {
        if (input.length < this.input.length) {
            this.attempt = this.attempt.substring(0, this.attempt.length-1)
        } else {
            if (this.attempt.length < 10)
                this.attempt += input.charAt(input.length-1)
        }
        this.input = input;
        
        this.setState((state) => {
            if (this.attempt.length > 0) {
                if (this.attempt.length < 4) {
                    return {
                        text: '+1 ('+this.attempt+')'
                    }
                } else {
                    if (this.attempt.length < 7) {
                        return {
                            text: '+1 ('+this.attempt.substring(0, 3)+') '+this.attempt.substring(3)
                        }
                    } else {
                        return {
                            text: '+1 ('+this.attempt.substring(0, 3)+') '+this.attempt.substring(3, 6)+'-'+this.attempt.substring(6)
                        }
                    }
                }
            } else {
                return {
                    text: this.attempt
                }
            }
        });
        //only allow user to continue
        //if the size of the string inputted >= 10 (canadian phone number)
        this.setState({disabled: this.attempt.length < 10 ? true : false});
    }

    //function for "hacky" authentication
    pseudoAuth() {
        if(this.attempt == this.correct){
            this.invalid = false;
            this.setState((state) => {
                return{alert: "Please enter your phone number: "};
            });
            // this.wait(2000);
            this.props.navigation.navigate('EnterPassCode');
        }
        else{
            this.setState((state) => {
                this.invalid = true;
                this.showErrorAnimation();
                return{alert: "Invalid phone number. Please try again:"};
            });
        }
    }
}

//style sheet used in text color change
const styles = StyleSheet.create({
    grey: {
        paddingBottom: 10,
        color: 'grey'
    },
    red: {
        paddingBottom: 10,
        color: 'red'
    },
});
