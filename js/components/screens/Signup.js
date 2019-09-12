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
    PRIMARY_COLOR_GREEN,
    PRIMARY_COLOR_DARK,
    DISABLED_COLOR,
    ButtonPrimary,
    ButtonTransparent
} from '../../styles/PrimaryStyles'


import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";




import LinearGradient from 'react-native-linear-gradient'

import NavBarDefault from '../UI/NavBarDefault'

import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";

import { checkEmailAddress, checkPassword } from "../../functions/helpers";

import { userSignUp } from "../../functions/auth";

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            stage : 0
        }

    }

  


    render(){
        return (
            <EmailForm />
        )
    }
}