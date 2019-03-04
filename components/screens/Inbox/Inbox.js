import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '@screens/Inbox/Card';

export default class Inbox extends React.Component {
	constructor(props){
		super(props);
		this.cards = this.getCards.bind(this);
	}

	getCards() {
		return (
			<Card/>
		);
	}

    render() {
        return (
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
            <Text style={styles.title}>Inbox</Text>
            {this.getCards()}
            {this.getCards()}
            {this.getCards()}
            {this.getCards()}
            {this.getCards()}
        </View>
        );
    }
}
const styles = StyleSheet.create({
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'left',
		paddingLeft: 20
	}
});

