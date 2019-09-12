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
    Keyboard
} from "react-native";


import NavBarDefault from '../UI/NavBarDefault'

import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";

import { checkEmailAddress, checkPassword } from "../../functions/helpers";

import { userSignUp } from "../../functions/auth";

export default class XSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailTFIconOpacity: 0.4,
            passwordTFIconOpacity: 0.4,
            emailTF: "",
            passwordTF: "",
            emailTFActive: false,
            passwordTFActive: false,
            emailPlaceholder: false,
            passwordPlaceholder: false,
            errorStatus: false,
            errorCode: "",
            errorMessage: "",
            buttonState: true
        };
        // this._handleInputChange = this._handleInputChange.bind(this)

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this.getButtonContent = this.getButtonContent.bind(this);
    }

    async componentDidMount() {
        try {
            let emailTF = await AsyncStorage.getItem("emailTF");
            let passwordTF = await AsyncStorage.getItem("passwordTF");
            console.log(emailTF + " " + passwordTF);
            if (emailTF !== null && passwordTF !== null) {
                this.setState({ emailTF, passwordTF });
            } else {
                await AsyncStorage.setItem("emailTF", "");
                await AsyncStorage.setItem("passwordTF", "");
            }
        } catch (e) {
            console.log(e);
        }
    }



    async _handleFormSubmit(){
        //buttonState to false (to show loader, and change opacity)
        this.setState({buttonState: false})
        Keyboard.dismiss()

        const {emailTF, passwordTF} = this.state
        try{
            await checkEmailAddress(emailTF)
            await checkPassword(passwordTF)
            //get user sign up response
            let userSignUp_RESPONSE = await userSignUp(emailTF, passwordTF);
            //authToken
            let {authToken} = userSignUp_RESPONSE
            console.log(authToken)
            //set authToken in AsyncStorage
            await AsyncStorage.setItem("authToken", authToken);
            //SUCCESS: redirect
            return Actions.initUserProfile({type:'reset'});

        }catch(e){
            console.log(e)
            this.setState({
                errorStatus: e.errorStatus,
                errorCode : e.errorCode,
                errorMessage : e.errorMessage,
                buttonState: true
            })
            return false
        }

        return false
    }



    _handleInputChange(value, name) {
        console.log(value, name);

        this.setState({
            [name]: value
        });
    }

    getButtonContent() {
        var { buttonState } = this.state;
        if (buttonState) {
            return <TextDefault color="#fff">CONTINUE</TextDefault>;
        } else {
            return (
                <IconDefault
                    size="35px"
                    source={require("../../../assets/images/icons/loaderDefault.gif")}
                />
            );
        }
    }

    render() {
        const {
            emailTFIconOpacity,
            passwordTFIconOpacity,
            emailTFActive,
            passwordTFActive,
            emailTF,
            passwordTF,
            buttonState
        } = this.state;

        var { emailPlaceholder, passwordPlaceholder } = this.state;

        if (emailTF.length === 0) {
            emailPlaceholder = true;
        }
        if (passwordTF.length === 0) {
            passwordPlaceholder = true;
        }

        var errorMessage =
            this.state.errorMessage === null ? "" : this.state.errorMessage;

        return (

            <View style={{flex : 1}}>
             <NavBarDefault title="SIGN UP" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1, background:'#f7f7f7' }}
            >

                <MainContainer>

                        <ScrollView
                            contentContainerStyle={{
                                minWidth: "100%"
                            }}
                        >
                            <FlexView >
                                <FormGroup>
                                    <DefaultErrorText>
                                        {errorMessage}
                                    </DefaultErrorText>
                                </FormGroup>

                                <FormGroup>
                                    <LabelView>
                                        <LabelText active={emailTFActive}>
                                            Email Address
                                        </LabelText>
                                    </LabelView>

                                    <InputDefault
                                        keyboardType="email-address"
                                        onFocus={() => {
                                            this.setState({
                                                emailTFIconOpacity: 1,
                                                emailTFActive: true,
                                                passwordTFActive: false
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                emailTFIconOpacity: 0.4,
                                                emailTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "emailTF"
                                            )
                                        }
                                        value={emailTF}
                                        autoCapitalize="none"
                                        active={emailTFActive}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <LabelView>
                                        <LabelText active={passwordTFActive}>
                                            Password
                                        </LabelText>
                                    </LabelView>

                                    <InputDefault
                                        secureTextEntry={true}
                                        onFocus={() => {
                                            this.setState({
                                                passwordTFIconOpacity: 1,
                                                emailTFActive: false,
                                                passwordTFActive: true
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                passwordTFIconOpacity: 0.4,
                                                passwordTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "passwordTF"
                                            )
                                        }
                                        value={passwordTF}
                                        active={passwordTFActive}
                                    />
                                </FormGroup>
                            </FlexView>
                        </ScrollView>


                    <FooterView>
                        <ButtonBlue
                            onPress={this._handleFormSubmit}
                            activeOpacity={0.7}
                            disabled={!buttonState}
                            disabledStyle={!buttonState}
                        >
                            {this.getButtonContent()}
                        </ButtonBlue>
                    </FooterView>
                </MainContainer>
            </KeyboardAvoidingView>
            </View>
        );
    }
}


