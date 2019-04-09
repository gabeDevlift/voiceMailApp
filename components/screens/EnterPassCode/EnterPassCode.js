import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Animated, Easing } from 'react-native';

export default class EnterPassCode extends Component {
	constructor(props) {
    	super(props);
    	this.state = { 
    		text: '',
    		alert: 'Please enter your password:',
            placemessage: 'Enter password...',
            disabled: true
    	};
    	this.forgotPass = this.forgotPass.bind(this);
    	this.change = this.change.bind(this);
    	this.auth = this.auth.bind(this);
    	this.animatedText = this.getAnimatedText.bind(this);
        this.shakeAnimation = new Animated.Value(0);
        this.invalid = false;
        this.attempt = '';
        this.correct = '123456';
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.text !== this.state.text) {

            if (this.state.text.length > 5){
                this.setState({
                    disabled: false
                })
            }
        }
    }

    //maybe there's a way to clean up the tags?
    render() {
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 220 }}>
            {
                this.state.incorrectPassword
                ?
                <Text style={{
                    color: 'red',
                    marginBottom: 15
                }}>
                    Incorrect password: please try again
                </Text>
                :
                null
            }
            {this.getAnimatedText()}
            <TextInput
            	ref={input => { this.passInput = input }}
        		style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1, borderRadius: 25, paddingLeft: 10}}
        		onChangeText={(text) => this.change(text)}
        		placeholder={this.state.placemessage}
        		secureTextEntry={true}
        		enablesReturnKeyAutomatically={true}
        		maxLength={15}
        		caretHidden={false}
        		clearTextOnFocus={true}
        		keyboardType="default"
        		value={this.state.text}
        		returnKeyType='next'
        		onFocus={() => this.onFocus()}
        		onSubmitEditing={() => this.auth()}
      		/>
      		<Button style={{paddingTop: 30 }}
      			title='Forgot password?'
      			onPress={() => this.forgotPass()}>
      		</Button><View style={{paddingTop: 30}}> 
                <Button title="Continue" disabled={this.state.disabled} onPress={() => {
                    this.state.text ===this.correct
                    ?
                    this.props.navigation.navigate('MainStack')
                    :
                    this.setState({
                        incorrectPassword: true
                    })
                }
                    }
                />
            </View>
        </View>
        );
    }

    //called everytime a character is inputted by user
    //function: changes what is displayed in the bar
    //and updates the "attempt" variable
    change(val) 
    {
    	this.setState((state) => 
    	{
    		console.log(val);
            this.attempt = val;
            return{text: val};
        });
    }

    //when focusing on the input bar, remove the placeholder
    onFocus()
    {
    	this.setState((state) => 
    	{
            return{placemessage: ''};
        });
    }

    //function called when forgot password? is pressed
    //brings up alert message (don't need to implement further)
    forgotPass() 
    {
    	Alert.alert(
		  'Go To Site',
		  'Pressing this button would help you restore your password (external source)',
		  [
		    {text: 'OK', onPress: () => console.log('OK Pressed')},
		  ],
		  {cancelable: false},
		);
    }

    //authentication for the user
    //called on submit (when user presses next)
    auth() {
    	if(this.attempt == this.correct)
    	{
    		this.invalid = false;
            this.setState((state) => {
                return{
                	alert: "Please enter your password: ", 
                	placemessage: 'Enter password...'
                };
            });
            this.passInput.clear();
            this.props.navigation.navigate('MainStack');

    	}
    	else
    	{
    		this.setState((state) => {
                this.invalid = true;
                this.showErrorAnimation();
                return{alert: "Incorrect password. Please try again:"};
            });
    	}
    }
}

//style sheets
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
