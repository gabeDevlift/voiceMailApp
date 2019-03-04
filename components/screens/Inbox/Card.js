import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Inbox extends React.Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	name: 'jon smith',
		// 	number: '(123)456-7890',
		// 	date: '01/01/19',
		// 	length: '0:20'
		// }
		
		this.fnames = ['Victor', 'Jerry', 'Jacquelyn', 'Gabe', 'William', 'Justin', 'Fiona', 'Sam', 'Jane', 'Zach', 'Rory', 'Jason', 'Raiya', 'Mila', 'Parker', 'Jordan', 'Michael', 'Aiden'];
		this.lnames = ['Shi', 'Chen', 'Koh', 'Smith', 'Stevens', 'Lau', 'Adams', 'McCann', 'Lopinski', 'Kwan', 'Khan', 'Lee', 'Yu', 'Lio', 'Park', 'Alfonso'];
		this.phones = ['(416)-553-3123','(905)-343-3223', '(888)-888-8888','(434)-132-1231', '(903)-434-2323','(232)-232-2323'];
		this.dates = ['01/01/19','01/02/19','01/03/19','01/04/19','03/01/18','10/01/18','12/03/18'];
		this.length = ['0:20', '0:30','1:20','0:22','0:21','0:56'];
		this.randomCard = this.getRandom.bind(this);
	}

	getRandom(){
		return (
            <View style={{ borderWidth: 1, borderColor: 'black', height: 150, width: '100%' }}>
	            <Text style={{ textAlign: 'left'}}>
	            	{
	            		this.fnames[Math.floor(Math.random() * 100) % this.fnames.length] 
	            		+ ' ' + 
	            		this.lnames[Math.floor(Math.random() * 100) % this.lnames.length]
	            	}
	            </Text>
	            <Text style={{ textAlign: 'left'}}>
	            	{
	            		this.phones[Math.floor(Math.random() * 100) % this.phones.length]
	            	}
	            </Text>
	            <Text style={{ textAlign: 'left'}}>
		            {
		            	this.dates[Math.floor(Math.random() * 100) % this.dates.length]
		            }
	            </Text>
	            <Text style={{ textAlign: 'left'}}>
		            {
		            	this.length[Math.floor(Math.random() * 100) % this.length.length]
		            }
	            </Text>
        	</View>
     	)
	}

    render() {
        return (
        	<View>
     			{this.getRandom()}
     		</View>
        );
    }
}

// const fnames = ['Victor', 'Jerry', 'Jacquelyn', 'Gabe', 'William', 'Justin', 'Fiona', 'Sam', 'Jane', 'Zach', 'Rory', 'Jason', 'Raiya', 'Mila', 'Parker', 'Jordan', 'Michael', 'Aiden'];
// const lnames = ['Shi', 'Chen', 'Koh', 'Smith', 'Stevens', 'Lau', 'Adams', 'McCann', 'Lopinski', 'Kwan', 'Khan', 'Lee', 'Yu', 'Lio', 'Park', 'Alfonso'];
// const phones = ['(416)-553-3123','(905)-343-3223', '(888)-888-8888','(434)-132-1231', '(903)-434-2323','(232)-232-2323'];
// const dates = ['01/01/19','01/02/19','01/03/19','01/04/19','03/01/18','10/01/18','12/03/18'];
// const length = ['0:20', '0:30','1:20','0:22','0:21','0:56'];