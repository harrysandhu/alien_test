import React, {Component} from 'react'
import axios from 'axios'
import {
    MainContainer,
    LogoContainer,
    LogoImage,
    GreyText,
    ButtonContainer,
    ButtonBlue,
    ButtonDarkGrey,
    TextDefault,
    SplashContent,
} from '../../styles/DefaultStyles'


import OptionsPane from '../panes/OptionsPane'
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'

import {
    PRIMARY_COLOR_GREEN,
    PRIMARY_COLOR_DARK,
    DISABLED_COLOR,
    ButtonPrimary,
    ButtonTransparent
} from '../../styles/PrimaryStyles'


import { Button, 
        Text, 
        View, 
        TouchableOpacity,
        TouchableWithoutFeedback,
        Image } from 'react-native';
 
import styled from 'styled-components'


import {StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'



export default class Splash extends Component {
    constructor(props){
        super(props);
        // this.handleOptionsPaneDismiss = this.handleOptionsPaneDismiss.bind(this)
        this.handleSignUpOptions = this.handleSignUpOptions.bind(this)
        this.handleLogInOptions = this.handleLogInOptions.bind(this)
        this.state = {
            optionsInProp : false,
            optionsType: ''
        }
    }

    handleSignUpOptions(){
           Actions.signup()
    }

    handleLogInOptions(){

            this.setState({
                optionsInProp: true,
                optionsType: 'login'
            })
        
    }

    // handleOptionsPaneDismiss(){
    //     console.log("pane closed")
    // }

    async componentDidMount(){
        console.log("bruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruh")
        try{
            await AsyncStorage.setItem('emailTF', '')
            await AsyncStorage.setItem('passwordTF', '')
            await AsyncStorage.setItem('authToken', '\0')
        }catch(e){
            console.log(e)
        }
    }

    render(){
        const {optionsInProp} = this.state
        return (
        
        
        <LinearGradient colors={["#000000", "#1D2538"]} style={{flex :1}}>
        <MainContainer>
            <LogoContainer>
                <LogoImage source={require('../../../assets/images/logos/logoWhiteLG.png')} />
            </LogoContainer>
            <SplashContent>
                <GreyText width="80%">
                    Discover and build effective connections with professionals.
                </GreyText>
            </SplashContent>
            <ButtonContainer>
                <ButtonPrimary onPress={this.handleSignUpOptions} activeOpacity={0.7}>
                    <TextDefault color={PRIMARY_COLOR_DARK}>
                        GET STARTED
                    </TextDefault>
                </ButtonPrimary>
                 <ButtonTransparent onPress={this.handleLogInOptions} activeOpacity={0.7}>
                    <TextDefault color={PRIMARY_COLOR_GREEN}>
                        LOG IN
                    </TextDefault>
                </ButtonTransparent>
            </ButtonContainer>
            <OptionsPane inProp={optionsInProp}  optionsType={this.state.optionsType} />
             </MainContainer>
            </LinearGradient>
    
    
        );
    }


}



const styles = StyleSheet.create({
    buttonBlue: {
        color: '#fff',
        fontFamily: 'Nunito'
    }
})


const MyText = styled.Text`
    font-size: 30px;
    font-family: 'Nunito'
`;