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

import LinearGradient from 'react-native-linear-gradient'

import NavBarDefault from '../UI/NavBarDefault'
import NavBarStage from '../UI/NavBarStage'

import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";

import { checkEmailAddress, checkPassword } from "../../functions/helpers";

import { userSignUp } from "../../functions/auth";


import {
    PRIMARY_COLOR_GREEN,
    PRIMARY_COLOR_DARK,
    DISABLED_COLOR,
    ButtonPrimary,
    ButtonTransparent,
    InputTF
} from '../../styles/PrimaryStyles'





export default class PasswordForm extends Component  {
    constructor(props){
        super(props);
        this.state = {
            stageTitle : "",
            input: {
                active: false,
                value: "",
                attempt: 0
            },
            error: {
                errorMessage: null,
                errorStatus: false,
                errorCode: null
            }
        }

        this._handleNextStage = this._handleNextStage.bind(this)
    }

    async _handleNextStage(){
        const inputState = JSON.parse(JSON.stringify(this.state.input))
        const password = inputState.value
        if(inputState.attempt > 0){
            return false
        }else {
            try{
                await checkPassword(password)
                this.props.stageActions.nextStage()
            }catch(error){
                inputState.attempt += 1;
                this.setState({
                    error: error,
                    input: input
                })
            }
        }
      
    }   


    async componentDidMount(){

    }

    render(){
        const {stageTitle, input, error} = this.state
        var errorMessage = 
            (error.errorMessage === null) ? "" : error.errorMessage
        

        return (
        <View style={{flex: 1}}>
            <NavBarStage previousStage={this.props.stageActions.previousStage()} 
                        title={stageTitle} />
            <MainContainer>
            <FormGroup>
                <DefaultErrorText>
                     {errorMessage}
                 </DefaultErrorText>
             </FormGroup>
            <FlexView marginTop="100px">
                <GreyText size="18px">Choose a Password</GreyText>
                <FlexForm>
                
                <InputTF
                        active={input.active} 
                            secureTextEntry={true}
                         onFocus={() =>{
                             let inputState = JSON.parse(JSON.stringify(input))
                            inputState.active = true;
                            this.setState({
                                input : inputState
                            })
                         }}

                         onBlur={() =>{
                             let inputState = JSON.parse(JSON.stringify(input))
                            inputState.active = false;
                            this.setState({
                                input : inputState
                            })
                         }}

                         value={input.value}
                         autoCapitalize="none"

                         onChangeText={(value) =>{
                            let inputState = JSON.parse(JSON.stringify(input))
                            inputState.value = value
                             this.setState({
                                input : inputState
                             })
                         }}

                        />
                </FlexForm>
    
            </FlexView>
         <FooterView>

                        <ButtonPrimary onPress={this._handleNextStage} 
                        activeOpacity={0.7}>
                        CONTINUE
                        </ButtonPrimary>

                </FooterView>
                    
            </MainContainer> 
        </View>
        )
    }
}