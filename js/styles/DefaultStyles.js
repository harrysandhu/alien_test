import styled from 'styled-components'
import { Button, 
        Text, 
        View, 
        TouchableOpacity,
        Animated,
        Image,
        TextInput,
        KeyboardAvoidingView } from 'react-native';
 


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F5FCFF;
`;

export const LoadingImageView = styled.View`
    flex: 1;
    flex-direction: column;
    background: #fff;
    justify-content: center;
    align-items: center;
    
`;

export const LoadingImage = styled.Image`
    width: 40%;
`;



export const SplashContent = styled.View`
    position:absolute;
    top: 30%;
    width: 100%;
    display: flex;
     flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const MainContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const ButtonBlue = styled.TouchableOpacity`
    width: 100%;
    height: 55px;
    background-color: ${props => (props.disabledStyle === true) ? '#43596d': '#0788FF'};
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
   box-shadow:${props => (props.disabledStyle === true) ? 'none': '0px 7px 13px rgba(7, 136, 255, 0.41)'}; 


`;

export const ButtonDarkGrey = styled.TouchableOpacity`
   width: 100%;
    height: 55px;
    background-color: #282828;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    font-family: 'Roboto';
    border-radius: 10px;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.25);

    
`;




export const ButtonContainer = styled.View`
        position: absolute;
        bottom: 20;
        width: 90%;
        justify-content:center;
        align-items: center;
`


export const LogoContainer = styled.View`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 15%;
    width:70%;
    justify-content: center;
    align-items: center;
`;

export const LogoImage = styled.Image`
    flex: 1;
    width: 50%;
    resize-mode: contain;
`;


export const GreyText = styled.Text`
    width: 80%;
    color:#cfcfcf;
    font-size: ${props => (props.size) ? props.size : '20px'};
    text-align: center;
`;


export const TextDefault = styled.Text`
     font-size: ${props => props.size ? props.size: '16px'};
    font-family: 'Roboto-Medium'
    color: ${props => props.color};
`



export const DarkOverlay = styled.TouchableOpacity`
    z-index: 1;
    flex: 1;
    width:100%;
    background: #000;
    opacity: 0.9;
`


export const FlexView = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top = ${props => (props.marginTop)? props.marginTop: '0px'}
`
export const OptionsPaneView = styled.View`
    width: 100%;
    height: 366px;
    background: #FFFFFF;
    box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.37);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`

export const OptionsHead = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: -15px;
    padding-bottom: 15px;
    width: 100%;
`

//props: {color}
export const HeadText = styled.Text`
    font-family: 'Roboto-Medium';
    font-size: ${props => props.fontSize ? props.fontSize : '22px'};
    color: ${props => props.color};
`






export const CancelButton = styled.TouchableOpacity`
    position: absolute;
    right:10;
    top: -35;
`

//props: {size}
export const IconDefault = styled.Image`
    width: ${props => props.size};
      flex: 1;
    resize-mode: contain;
    opacity: ${props => props.opacity ? props.opacity: 1};
`

export const OptionsButtonContainer = styled.View`
    display: flex; 
    width: 100%;
    height: 65%;
    margin-bottom: -20px;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
`


export const FacebookButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background: #0077E4;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`
export const GoogleButton = styled.TouchableOpacity`
   width: 80%;
    height: 50px;
    background: #db3236;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`



export const GreyButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    background: #616161;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`



export const SignUpHeader = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    position: absolute;
    top: 45%;
`

export const DefaultNavbarHeader = styled.View`
    width: 100%;
    position:absolute;
    height: 100px;
    background:transparent;
    top: 0;
`



export const CFColumn = styled.View`
    display:flex;
    height: 100%;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems: 'center'}
`
export const CFRow = styled.View`
    display:flex;
    width: 100%;
    flex-direction: row;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems: 'center'}
`

export const FormContainer = styled.View`
    width: 100%;
    height: 200px;
    position:relative;
    top: 250px;

`


export const PlaceholderText = styled.Text`
    z-index: 1;
    font-size:16px;
    position: relative;

    color: ${props => (props.placeholderActive === true)? '#818181' : 'transparent'};

`




export const BackButtonIcon = styled.TouchableOpacity`
    position:absolute;
    top:30;
    left: 10;
`  
export const FormGroupDefault = styled.View`
    width:85%;
    height: 90px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

export const InputIcon = styled.View`
    z-index: 1;
    position: absolute;
    left: 20;
`


export const GreyButtondDefault = styled.TouchableOpacity`
    width: 100%;
    height: 65px;
    background-color: #0788FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    font-family: 'Roboto';
    border-radius: 10px;
    box-shadow: 0px 8px 17px rgba(7, 136, 255, 0.47); 
`


export const FooterButton = styled.TouchableOpacity`
    height: 40px;
    background:#010101;
    position:absolute;
    bottom: 0;
    width:100%;
`


export const ContinueButton = styled.TouchableOpacity`
    width: 100%;
    height: 55px;
    background-color: #0788FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    top: -20px;
    font-family: 'Roboto';
    border-radius: 10px;
    box-shadow: 0px 3px 5px rgba(7, 136, 255, 0.17); 
`;


export const DefaultErrorText = styled.Text`
    font-family: 'Roboto';
    color: #ff0000;
    font-size: 14px;
    width:300px;


`



export const SignupFormView = styled.View `
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right:auto;
    margin-left:auto;
    justify-content: flex-start;
    align-items:center;
    flex: 1;
    padding-top: 100px;
    margin-bottom:50px;
`

export const FormGroup = styled.View `
    width: 90%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding-top:10px;
    padding-bottom: 10px;
`

export const InputDefault = styled.TextInput `
    width: 100%;
    height: 51px;
    background:#F5F5F5;
    border-radius: 10px;
    padding-left: 30px;
    color:#000;
    font-size:16px;
    border: ${props => (props.active === true) ? '2px solid #E6E6E6': 'none'};
    ${'' /* box-shadow: ${props => (props.active === true) ? '0px 0px 4px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'}; */}
`


export const ButtonGrey = styled.TouchableOpacity`
    width: 100%;
    height: 65px;
    background: #616161;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    font-family: 'Roboto';
    border-radius: 10px;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.25);
`

export const FooterView = styled.View `
    width: 90%;
    display: flex;
    margin-right: auto;
    margin-left:auto;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    height: auto;

`        




export const NavbarDefault = styled.View `
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height: 80px;
    padding-top:40px;
    background: transparent;
`


export const NavButton =  styled.TouchableOpacity `
    padding-left: 30px;

`

export const NavButtonRight =  styled.TouchableOpacity `
    padding-right: 30px;

`


export const NavButtonImage = styled.Image `
    flex: 1;
    width: ${props => props.size ? props.size: '20px' };
    resize-mode: contain;

`



export const NavTitle = styled.Text `
    font-family: 'Roboto-Medium';
    font-size: 18px;
    color: ${props => props.color ? props.color: '#fff'}
`

export const NavSub = styled.Text`
    font-size: 10px;
    font-family: 'Roboto';
    color:#000;
`

export const NavTitleView = styled.View `
    flex:1;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    margin-right: 30px;

`


export const ProfilePictureUploadView = styled.TouchableOpacity`
    background-color: #f9f9f9;
    border-radius: 100px;
    width: 90px;
    overflow:hidden;
    height: 90px;
    
`

export const ProfilePictureImage = styled.Image`
    flex: 1;
    width:100%;
    resize-mode: cover;
`


export const ProfilePictureView = styled.View`
      background-color: #f9f9f9;
    border-radius: 200px;
    width: 150px;
    overflow:hidden;
    height: 90px;
    
`


export const DefaultTF = styled.TextInput`
    width: 100%;
    height: 51px;
    ${'' /* background: ${props => (props.active === true)? '#fff': '#f5f5f5'}; */}
    background:transparent;
    border-radius: 10px;
    padding-left: 45px;
    color:#fff;
    font-size:16px;
    box-shadow: ${props => (props.active === true) ? '0px 0px 10px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'};
`

export const LabelView = styled.View`
    width: 100%;
    height: 30px;

`


export const LabelText = styled.Text`

    color: ${props => (props.active === true) ? '#4c4c4c': '#848484'};
    font-family: 'Roboto-Medium';
    font-size: 14px;
`



export const NavFlex = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content:center;
    align-items:center;

`



export const InputTextArea = styled.TextInput `
 width: 100%;
    height: 75px;
    background:#F5F5F5;
    border-radius: 10px;
    padding-left: 30px;
    color:#000;
    padding-top:10px;
    font-size:16px;
    border: ${props => (props.active === true) ? '2px solid #E6E6E6': 'none'};
    ${'' /* box-shadow: ${props => (props.active === true) ? '0px 0px 4px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'}; */}
`