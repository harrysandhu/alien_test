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
    FlexView,
    ProfilePictureView
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

import {
    checkUserProfileFields,
    checkUsername,
    checkEmailAddress,
    checkPassword,
    insertUserData
} from '../../functions/helpers'


import { userSignUp,  getUserLogInState,
    getCurrentUser } from "../../functions/auth";

export default class FinishSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
           currentUser : {},
           loading: true,
           errorStatus: false,
           errorMessage: null,
           errorCode :null
        };

        // this.handleEnableBusinessProfile = this.handleEnableBusinessProfile.bind(this)
        this.handleSkip = this.handleSkip.bind(this)
    }


    handleSkip(){
        Actions.UserHome()    
    }



    async componentDidMount(){
        
         try{
            let authToken = await AsyncStorage.getItem('authToken')
            let userIsLoggedIn = await getUserLogInState(authToken)
            if(userIsLoggedIn){
                console.log("user is logged in, now getting the user")
                let currentUser = await getCurrentUser(authToken)

                this.setState({
                    currentUser: currentUser,
                    loading: false
                })
            } else {
                Alert.alert(
                    'Log in required',
                    'You are not logged in.',
                    [
                        {text: 'Log In', onPress: () => Actions.splash({type:'reset'})},
                    ],
                    {cancelable : false },

                );
            }

        }catch(e){
            console.log(JSON.stringify(e))
             Alert.alert(
                    'Log in required',
                    'You are not logged in.',
                    [
                        {text: 'OK', onPress: () => Actions.splash({type:'reset'})},
                    ],
                    {cancelable : false },

                );
            this.setState({
                errorStatus: e.errorStatus,
                errorMessage: e.errorMessage,
                errorCode :e.errorCode
            })
        }

    }


    render() {
        console.log(currentUser)
        //get user state
        let {currentUser, loading} = this.state
        if(loading) {
            return (
                <MainContainer>
                <FlexView>
                         <IconDefault
                    size="35px"
                    source={require("../../../assets/images/icons/loaderDark.gif")}
                     />
                </FlexView>
                </MainContainer>
            )
        }else if(!loading) {
            return (
                    <MainContainer>
                        <FlexView>
                            <Text>Hello, {currentUser.name}</Text>
                            
                        </FlexView> 
                    </MainContainer>
                );
        }

    }
}
