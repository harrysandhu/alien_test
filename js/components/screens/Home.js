import React, { Component } from "react";
import axios from "axios";
import {
    MainContainer,
    LogoContainer,
    LogoImage,
    GreyText,
    ButtonContainer,
    ButtonBlue,
    ButtonBlack,
    GreyButton,
    TextDefault,
    SignUpHeader,
    HeadText,
    FormContainer,
    DefaultTF,
    CFRow,
    CFColumn,
    BackButtonIcon,
    DefaultNavbarHeader,
    IconDefault,
    InputIcon,
    FormGroupDefault,
    GreyButtondDefault,
    PlaceholderText,
    FooterButton,
    ContinueButton,
    DefaultErrorText,
    NavbarDefault,
    NavButton,
    NavButtonImage,
    NavTitle,
    SignupFormView,
    FormGroup,
    InputDefault,
    ButtonGrey,
    FooterView,
    NavTitleView,
    NavButtonRight,
    NavSub,
    LabelText,
    LabelView,
    FlexView
} from "../../styles/DefaultStyles";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";

import { checkEmailAddress, 
        checkPassword 
        } from "../../functions/helpers";


import { userSignUp,  getUserLogInState,
    getCurrentUser } from "../../functions/auth";



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser : {},
            userAuthState : false,
           loading: true,
           errorStatus: false,
           errorMessage: null,
           errorCode :null,
           count: 0
        };
    }


    async componentDidMount(){
    	let {count } = this.state

    	this.setState({
    		count: count + 1
    	})
    }


render(){
	return (
		<MainContainer>
			<FlexView>
			<Text>Home count:  {this.state.count}</Text>
			</FlexView>
		</MainContainer>
		);
}

}