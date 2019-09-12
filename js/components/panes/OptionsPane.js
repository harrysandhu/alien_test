import React, {Component} from 'react'
import axios from 'axios'
import {
    Button, 
    Text,
    View,
    TouchableOpactiy,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Easing,
    StyleSheet,

    } from 'react-native'

import {
    OptionsPaneView,
    FlexView,
    DarkOverlay,
    OptionsHead,
    HeadText,
    IconDefault,
    TextDefault,
    OptionsButtonContainer,
    GreyButton,
    FacebookButton,
    GoogleButton,
    CancelButton,
    GreyText

} from '../../styles/DefaultStyles'

import styled from 'styled-components'
import {Actions} from 'react-native-router-flux'



export default class OptionsPane extends Component {
    constructor(props){
        super(props);
        this.state = {
            inProp : this.props.inProp,
            moveAnimation: new Animated.Value(0),
            fadeValue: new Animated.Value(0),

        }

        this._handleDismiss = this._handleDismiss.bind(this)    
        this.UIRenderButtons = this.UIRenderButtons.bind(this)
        this.UIRenderHeadText = this.UIRenderHeadText.bind(this)
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
                    inProp: nextProps.inProp, 
                    moveAnimation: new Animated.Value(0),
                    fadeValue: new Animated.Value(0)
                    })
    }

    animateOptionsPaneView(){

        return Animated.parallel([

       Animated.timing(this.state.moveAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
      Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    })

        ]).start();

    }

    componentDidUpdate() {
            this.animateOptionsPaneView()
    }

    _handleDismiss(){
        this.setState({inProp: false, 
                moveAnimation: new Animated.Value(0),
                    fadeValue: new Animated.Value(0)

            })
    }


    UIRenderHeadText(optionsType){
          if(optionsType === 'signup') {
            return "Sign Up"
          }
          return "Log In"
    }


    UIRenderButtons(optionsType){
            
        if(optionsType === 'signup') {
            return (
                 <OptionsButtonContainer>
        
                            <FacebookButton activeOpacity={0.7}>
                                <TextDefault color="#fff">Sign up with Facebook</TextDefault>
                            </FacebookButton>

                            <GoogleButton activeOpacity={0.7}>
                                <TextDefault color="#fff">Sign up with Google</TextDefault>
                            </GoogleButton>

                            <GreyButton  onPress={() => Actions.signup() } activeOpacity={0.7}>
                                <TextDefault color="#fff">Sign up with Email</TextDefault>
                            </GreyButton>
                            
                        </OptionsButtonContainer>
            )
        }else if(optionsType === 'login') {
            return (
                 <OptionsButtonContainer>
        
                            <FacebookButton activeOpacity={0.7}>
                                <TextDefault color="#fff">Log in with Facebook</TextDefault>
                            </FacebookButton>

                            <GoogleButton activeOpacity={0.7}>
                                <TextDefault color="#fff">Log in with Google</TextDefault>
                            </GoogleButton>

                            <GreyButton onPress={() => Actions.login()} activeOpacity={0.7}>
                                <TextDefault color="#fff">Log in with Email</TextDefault>
                            </GreyButton>
                            
                        </OptionsButtonContainer>
            )
        }

    
    }




    render(){
        const {inProp, fadeValue} = this.state
        const {optionsType} = this.props
        if(inProp && (optionsType === 'login' || optionsType === 'signup')){
            return (
            <FlexView>
                <DarkOverlay onPress={this._handleDismiss}></DarkOverlay>
                <Animated.View style={{
                    zIndex: 2,
                    width: '90%',
                    height: 'auto',
                    display: 'flex',
                    opacity: fadeValue,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 20,
                    transform: [
                        {
                            translateY: this.state.moveAnimation.interpolate({inputRange: [0, 1], outputRange: [300, 0]})
                        }
                        ],
                    alignItems: 'center'
                    }}>
                    <OptionsPaneView>
                        <OptionsHead>
                            <HeadText color="#000"> 
                              {this.UIRenderHeadText(optionsType)}
                            </HeadText>
                            <CancelButton onPress={this._handleDismiss}>
                                <IconDefault size="20px" source={require('../../../assets/images/icons/cancelSolid.png')}/>
                            </CancelButton>
                        </OptionsHead>
                
                       {this.UIRenderButtons(optionsType)}

                    </OptionsPaneView>
                </Animated.View>
            </FlexView>
            )
        }
        return (
            <View></View>
        )
    }


}


const styles = StyleSheet.create({

})