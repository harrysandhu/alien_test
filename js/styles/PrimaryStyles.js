import styled from 'styled-components'
import { Button, 
        Text, 
        View, 
        TouchableOpacity,
        Animated,
        Image,
        TextInput,
        KeyboardAvoidingView } from 'react-native';
 


export const PRIMARY_COLOR_GREEN = '#00D2B9'
export const PRIMARY_COLOR_DARK = '#08090C'
export const DISABLED_COLOR = '#43586d'

export const ButtonPrimary = styled.TouchableOpacity`
    width: 100%;
    height: 55px;
    background-color: ${props => (props.disabledStyle === true) ? DISABLED_COLOR: PRIMARY_COLOR_GREEN};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    top: -20px;
    font-family: 'Roboto';
    border-radius: 10px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
   ${'' /* box-shadow:${props => (props.disabledStyle === true) ? 'none': '0px 7px 13px rgba(7, 136, 255, 0.41)'};  */}
`

export const ButtonTransparent = styled.TouchableOpacity`
     width: 100%;
    height: 55px;
    background-color: ${props => (props.disabledStyle === true) ? DISABLED_COLOR: 'transparent'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    top: -20px;
    font-family: 'Roboto';
    border-radius: 10px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
   ${'' /* box-shadow:${props => (props.disabledStyle === true) ? 'none': '0px 7px 13px rgba(7, 136, 255, 0.41)'};  */}
`


export const InputTF = styled.TextInput `
     width: 100%;
    height: 51px;
    background: ${props => (props.active === true)? 'rgba(90, 90, 90, 0.38)': 'rgba(90, 90, 90, 0.18)'};
    ${ /* background:transparent; */}
    border-radius: 10px;
    padding-left: 45px;
    color:#cfcfcf;
    font-size:16px;
    box-shadow: ${props => (props.active === true) ? '0px 0px 10px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'}
`

export const ButtonPrimaryLG = styled.TouchableOpacity`
    width:90%;
    height:35%;
    background:${PRIMARY_COLOR_GREEN};
    border-radius: 10px;
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ButtonLightLG = styled.TouchableOpacity`
    width:90%;
    height:35%;
    background:#fff;
    border-radius: 10px;
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`