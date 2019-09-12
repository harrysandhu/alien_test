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

import TabIcon from '../UI/TabIcon'
// import UserProfile from '../screens/UserProfile'
import Home from '../screens/Home'
import Profile from '../screens/Profile'




export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser : {},
            userAuthState : false,
           loading: true,
           errorStatus: false,
           errorMessage: null,
           errorCode :null
        };
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
                    userAuthState: true,
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

    
    render(){
        console.log(currentUser)
        //get user state
        let {currentUser, userAuthState, loading} = this.state
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
        }else if(!loading && userAuthState) {
            return (
                    <Scene key="user" tabs={true}>
                        <Scene key="user_home" component={Home}
                            navigationBarStyle={{display:'none'}}
                            title="home"
                            icon={TabIcon} />
                        /> 

                        <Scene key="user_profile" component={UserProfile}
                        navigationBarStyle={{display: 'none'}} 
                        title="userProfile"
                        icon={TabIcon} />

                    </Scene>
                );
        }

    
    return (<View></View>)
    }
}