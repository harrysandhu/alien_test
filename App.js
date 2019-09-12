import React, { Component } from 'react';
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          Image
        } from 'react-native';

import axios from 'axios'
import Splash from './js/components/screens/Splash'

import Signup from './js/components/screens/Signup'
import PasswordForm from './js/components/forms/PasswordForm'
import AccountTypeForm from './js/components/forms/AccountTypeForm'
import BusinessCategoryForm from './js/components/forms/BusinessCategoryForm'
import PersonalProfileSetup from './js/components/forms/PersonalProfileSetup'
import BusinessTagsForm from './js/components/forms/BusinessTagsForm'
import InstagramConnectForm from './js/components/forms/InstagramConnectForm'
import PersonalProfileForm from './js/components/forms/PersonalProfileForm'
import PhoneNumberForm from './js/components/forms/PhoneNumberForm'
import VerifyPhoneNumberForm from './js/components/forms/VerifyPhoneNumberForm'
import BillingAddressForm from './js/components/forms/BillingAddressForm'
import PaymentDetailsForm from './js/components/forms/PaymentDetailsForm'


import XSignup from './js/components/screens/XSignup'
import Login from './js/components/screens/Login'
import { Router, Scene } from 'react-native-router-flux'
import UserProfileIntial from './js/components/screens/UserProfileInitial'
import FinishSignup from './js/components/screens/FinishSignup'
import NavBarDefault from './js/components/UI/NavBarDefault'
import NavBarFlex from './js/components/UI/NavBarFlex'




import UserHome from './js/components/user/UserHome'

import AsyncStorage from '@react-native-community/async-storage';



import {
  userIsLoggedIn
  } from './js/functions/helpers'


import {
        Container, 
        ButtonBlue,
        ButtonBlack,
        GreyText,
        LogoContainer,
        LogoImage,
        LoadingImageView,
        LoadingImage,
          BackButtonIcon,
         IconDefault,    
        } from './js/styles/DefaultStyles'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userAuth: false,
      loading: true
    }
  }


  async componentDidMount(){
    try{
      let userIsLoggedIn = await userIsLoggedIn();

      if(userIsLoggedIn) {
          this.setState({userState: true, loading: false})
       }else{
         this.setState({userState : false, loading: false})
       }
    }catch(e){
      console.log("userIsLoggedIn error: ", e)
      this.setState({
        userAuth: false,
        loading: false
      })
    }
  }


  render() {
    const {userAuth, loading} = this.state
    if(userAuth && !loading){
      return (
        <Router>
          <Scene key="user">
             <Scene key="userHome" component={UserHome} 
            navigationBarStyle= {{display: 'none'}}
            initial />
          </Scene>
        </Router>
      )
    }else if(!userAuth && !loading){
      //render home screen
      return (
        <Router>
            <Scene key="root">
              <Scene key="splash" component={Splash} 
                navigationBarStyle={{display:'none'}}
              initial/>
              <Scene key="x_signup" component={XSignup} 
                navigationBarStyle={{display:'none'}}
                back
              />
              <Scene key="signup" component={Signup} 
                navigationBarStyle={{display:'none'}}
                back 
              />
              <Scene key="passwordForm" component={PasswordForm} 
              navigationBarStyle={{display:'none'}}
              back
              />

              <Scene key="accountTypeForm" component={AccountTypeForm} 
              navigationBarStyle={{display:'none'}}
              back 
              />
              <Scene key="businessCategoryForm" component={BusinessCategoryForm}
              navigationBarStyle={{display:'none'}}
              back
              />
              <Scene key="personalProfileSetup" component={PersonalProfileSetup}
              navigationBarStyle={{display:'none'}}
              back
              />

              <Scene key="businessTagsForm" component={BusinessTagsForm}
              navigationBarStyle={{display: 'none'}}
              back 
              />
              <Scene key="instagramConnectForm" component={InstagramConnectForm} 
              navigationBarStyle={{display: 'none'}}
              back 
              />

              <Scene key="personalProfileForm" component={PersonalProfileForm}
              navigationBarStyle={{display:'none'}}
              back
              />

              <Scene key="phoneNumberForm" component={PhoneNumberForm}
              navigationBarStyle={{display:'none'}}
              back
              />
              <Scene key="verifyPhoneNumberForm" component={VerifyPhoneNumberForm}
              navigationBarStyle={{display:'none'}}
              back
              />
              <Scene key="billingAddressForm" component={BillingAddressForm}
              navigationBarStyle={{display:'none'}}
              back
              />
              <Scene key="paymentDetailsForm" component={PaymentDetailsForm}
              navigationBarStyle={{display:'none'}}
              back
              />

              <Scene key="login" component={Login} 
              navigationBarStyle={{display:'none'}}
                back/>
              <Scene key="initUserProfile" component={UserProfileIntial} 
                   navTransparent={true}
                   navBar={NavBarFlex}
                   title="SET UP YOUR PROFILE"

              />
               <Scene key="finishSignup" component={FinishSignup} 
                   navTransparent={true}
                   navBar={NavBarFlex}
                   title="SIGN UP COMPLETE"

              />
              <Scene key="UserHome" component={UserHome}
                 navigationBarStyle={{display:'none'}}
               />
            </Scene>
        </Router>
      )
    }
    return (
        <LoadingImageView>
          <LoadingImage source={require('./assets/images/logos/logoGreyLG.png')}/>
        </LoadingImageView>
    )
  }
}

