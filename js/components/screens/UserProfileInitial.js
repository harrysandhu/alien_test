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
    NavSub,
    LabelText,
    LabelView,
    FlexView,
    InputTextArea,
    ProfilePictureUploadView,
    ProfilePictureImage
} from '../../styles/DefaultStyles'
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          TextInput,
          KeyboardAvoidingView,
          ScrollView,
          Button,
          Keyboard,
          Alert
        } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';

import RNFS from 'react-native-fs';





import {
    checkUserProfileFields,
    checkUsername,
    checkEmailAddress,
    checkPassword,
    insertUserData
} from '../../functions/helpers'


import {
    getUserLogInState,
    getCurrentUser
} from '../../functions/auth'




export default class UserProfileInitial extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameTFActive : false,
            usernameTFActive: false,
            profilePicActive: false,
            userDescriptionTFActive: false,
            nameTF: '',
            usernameTF: '',
            userDescriptionTF: '',
            buttonState: true,
            profilePictureImageSource: "",
            errorStatus: false,
            errorCode: null,
            errorMessage: null,
            profilePictureIsSelected: false,
            profilePictureImageData: '',
            currentUser: {},
            loading: true
        }
        this.getButtonContent = this.getButtonContent.bind(this);
        this.getChangeButton = this.getChangeButton.bind(this)
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
        this._handleSelectProfilePicture = this._handleSelectProfilePicture.bind(this)
    }


    async componentDidMount(){

         try{
            let authToken = await AsyncStorage.getItem('authToken')
            let userIsLoggedIn = await getUserLogInState(authToken)
            if(userIsLoggedIn){
                console.log("user is logged in, now getting the user")
                let currentUser = await getCurrentUser(authToken)
                console.log("got the user, setting state")

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
                        {text: 'Log In', onPress: () => Actions.splash({type:'reset'})},
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



    async _handleFormSubmit(){
       this.setState({ buttonState: false });
        Keyboard.dismiss();
        let { 
            nameTF,
            usernameTF,
            userDescriptionTF,
            profilePictureImageData,
            profilePictureIsSelected
            } = this.state
        
        let userData = {
            name : nameTF,
            username: usernameTF,
            userDescription : userDescriptionTF,
            profilePictureImageData,
            profilePictureIsSelected
        }

        try{
            console.log('checking profile fields')
            await checkUserProfileFields(userData.name, userData.username, userData.userDescription)
            console.log('profile fields checked....')
            await checkUsername(userData.username)
            console.log('username checked....')
            await insertUserData(userData)

            console.log('success: _handleFormSubmit')

            /**Here we already have authToken in AsyncStorage,
            * Redirect user to FinishProfilePage so they can
            * choose betweenm default user or business profile, 
            * !!!IMPORTANT : validate authToken on every screen.!!
            **/

            Actions.finishSignup({type: 'reset'})



        }catch(e){
             console.log(JSON.stringify(e))
             this.setState({
                errorStatus: e.errorStatus,
                errorCode: e.errorCode,
                errorMessage: e.errorMessage,
                buttonState: true
            });
            return false;
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


    _handleSelectProfilePicture(){
        ImagePicker.openPicker({
  width: 400,
  height: 400,
  cropping: true
}).then(image => {

    let imagePath = "file://" + image.path

    RNFS.readFile(imagePath, 'base64')
  .then(res => {
      let base64DataString = "data:" + image.mime + ';base64,' + res
        console.log(base64DataString)
            this.setState({
                profilePictureIsSelected: true,
                profilePictureImageSource: imagePath,
                profilePictureImageData: base64DataString
            })
  })
  .catch(err => {
        console.log(err)
        this.setState({
            errorStatus: true,
            errorCode: 'IMAGE_ERROR',
            errorMessage: 'Something went wrong. Please try again.'
        })
  });

})
    }



    getProfilePicture(){
        const {profilePictureIsSelected, profilePictureImageSource} = this.state
        
        if(profilePictureIsSelected){
            console.log("the souaiuhfsdbfisd: ", profilePictureImageSource)
            return (
                 <ProfilePictureImage source={{uri: profilePictureImageSource}} />
            )
        }else {
            return (
                 <ProfilePictureImage source={require('../../../assets/images/ui/defaultAvatar.png')} />
            )
        }
    }


    getChangeButton(){
        var {profilePictureIsSelected} = this.state
        if(profilePictureIsSelected){
            return (
                <Button title="Change" onPress={this._handleSelectProfilePicture} />
            )
        }
    }


    render(){

        const { nameTFActive,
                usernameTFActive,
                profilePicActive,
                userDescriptionTFActive,
                nameTF,
                usernameTF,
                userDescriptionTF,
                buttonState,
                profilePictureImageSource
            } = this.state
        console.log(profilePictureImageSource)
        var errorMessage = 
            (this.state.errorMessage === null) ? "" : this.state.errorMessage

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": null} 
                style={{flex : 1}}>
            <MainContainer>
                <SignupFormView>
                    <ScrollView contentContainerStyle={{minWidth:'100%'}}>
                        <FlexView>

                            <FormGroup>
                                <DefaultErrorText>
                                    {errorMessage}
                                </DefaultErrorText>
                            </FormGroup>

                            <FormGroup>
                                <ProfilePictureUploadView onPress={this._handleSelectProfilePicture}>
                               {this.getProfilePicture()}
                                </ProfilePictureUploadView>    
                                   {this.getChangeButton()}
                            </FormGroup>

                            <FormGroup>
                                <LabelView>
                                    <LabelText active={nameTFActive}>Name</LabelText>
                                </LabelView> 
                                <InputDefault
                                        onFocus={() => {
                                            this.setState({
                                                nameTFActive: true
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                nameTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "nameTF"
                                            )
                                        }
                                        value={nameTF}
                                        active={nameTFActive}
                                    />
                             </FormGroup>      

                             <FormGroup> 
                                 <LabelView>
                                    <LabelText active={usernameTFActive}>Username</LabelText>
                                </LabelView> 
                                     <InputDefault
                                        onFocus={() => {
                                            this.setState({
                                                usernameTFActive: true
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                usernameTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "usernameTF"
                                            )
                                        }
                                        value={usernameTF}
                                        autoCapitalize="none"
                                        active={usernameTFActive}
                                    />
                             </FormGroup> 

                              <FormGroup> 
                                 <LabelView>
                                    <LabelText active={userDescriptionTFActive}>Description</LabelText>
                                </LabelView> 
                                      <InputTextArea
                                        onFocus={() => {
                                            this.setState({
                                                userDescriptionTFActive: true
                                            });
                                        }}
                                         
                                        onBlur={() => {
                                            this.setState({
                                                userDescriptionTFActive: false
                                            });
                                        }}
                                        onChangeText={value =>
                                            this._handleInputChange(
                                                value,
                                                "userDescriptionTF"
                                            )
                                        }
                                        value={userDescriptionTF}
                                        active={userDescriptionTFActive}
                                        multiline={true}
                                        numberOfLines={4}
                                    />

                            </FormGroup>
                        </FlexView>
                    </ScrollView>
                </SignupFormView> 
            
                
                
            <FooterView>

                        <ButtonBlue onPress={this._handleFormSubmit} activeOpacity={0.7} disabled={!buttonState} disabledStyle={!buttonState}>
                        {this.getButtonContent()}
                        </ButtonBlue>

                </FooterView>
            
            </MainContainer>
            </KeyboardAvoidingView>
        )
    }
}