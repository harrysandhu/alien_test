import React, {Component} from 'react'
import axios from 'axios'
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
    NavSub
} from '../../styles/DefaultStyles'
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          TextInput,
          KeyboardAvoidingView
        } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux'


export default class TabIcon extends Component{
 constructor(props){
    super(props);

  }

render(){
    return (
        <View>
            <Text> {this.props.title} </Text>
        </View>
    )
}
}