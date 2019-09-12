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



import NavBarDefault from '../UI/NavBarDefault'

import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";

import { checkEmailAddress, 
        checkPassword, 
        getPrimaryFieldType, 
        checkFields,
        logInUser
        } from "../../functions/helpers";


import {RESPONSES} from '../../functions/helperConstants'
import { userSignUp } from "../../functions/auth";


export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            primaryTFIconOpacity: 0.4,
            passwordTFIconOpacity: 0.4,
            primaryTF: "",
            passwordTF: "",
            primaryTFActive: false,
            passwordTFActive: false,
            primaryPlaceholder: false,
            passwordPlaceholder: false,
            errorStatus: false,
            errorCode: "",
            errorMessage: "",
            buttonState: true
        }
    

        this._handleFormSubmit = this._handleFormSubmit.bind(this)
        this.getButtonContent = this.getButtonContent.bind(this)
    }



    async _handleFormSubmit(){
        //buttonState to false (to show loader, and change opacity)
        this.setState({buttonState: false})
        Keyboard.dismiss()
        let {
            primaryTF,
            passwordTF
        }  = this.state


        try{
            let primaryFieldType = await getPrimaryFieldType(primaryTF)
            console.log("past this yoooooooo.")
            if (primaryFieldType !== "email_address" && primaryFieldType !== "username"){
                throw RESPONSES.INVALID_PRIMARY_FIELD
            }else {
                // await checkFields(primaryTF, passwordTF, primaryFieldType)
                let authToken = await logInUser(primaryTF, passwordTF, primaryFieldType)
                await AsyncStorage.setItem('authToken', authToken)
                console.log("tis gucciiiii")
                Actions.UserHome({type:'reset'})
            }

        }catch(e){
            console.log(JSON.stringify(e))
            if(e.hasOwnProperty('errorStatus')){
                this.setState({
                    errorMessage: e.errorMessage,
                    errorCode: e.errorCode,
                    errorStatus: e.errorStatus,
                    buttonState: true
                })
                return false
            }else{
                console.log(JSON.stringify(e))
                let err = RESPONSES.ERR_SYSTEM
                this.setState({
                     errorMessage: err.errorMessage,
                    errorCode: err.errorCode,
                    errorStatus: err.errorStatus,
                    buttonState: true
                })
                return false

            } 




        }   
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
    render(){
        const {
            primaryTFIconOpacity,
            passwordTFIconOpacity,
            primaryTFActive,
            passwordTFActive,
            primaryTF,
            passwordTF,
            buttonState
        } = this.state


        var { primaryPlaceholder, passwordPlaceholder } = this.state;

        if (primaryTF.length === 0) {
            primaryPlaceholder = true;
        }
        if (passwordTF.length === 0) {
            passwordPlaceholder = true;
        }

        var errorMessage =
            this.state.errorMessage === null ? "" : this.state.errorMessage;

        return (
                 <View style={{flex : 1}}>
             <NavBarDefault title="LOG IN" />
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
                                        <LabelText active={primaryTFActive}>
                                            Email Address or Username
                                        </LabelText>
                                    </LabelView>

                                    <InputDefault
                                        onFocus={() => {
                                            this.setState({
                                                primaryTFIconOpacity: 1,
                                                primaryTFActive: true,
                                                passwordTFActive: false
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                primaryTFIconOpacity: 0.4,
                                                primaryTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "primaryTF"
                                            )
                                        }
                                        value={primaryTF}
                                        autoCapitalize="none"
                                        active={primaryTFActive}
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
                                                primaryTFActive: false,
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



















