
import React, {Component} from 'react'
import axios from 'axios'
import {

    NavbarDefault,
    NavButton,
    NavButtonImage,
    NavTitle,
    NavTitleView,
    NavButtonRight,
    NavSub,
    NavFlex
} from '../../styles/DefaultStyles'
import {  Platform, 
          StyleSheet, 
          Text, 
          View,
          TextInput,
          KeyboardAvoidingView
        } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux'


export default class NavBarFlex extends Component{
 constructor(props){
    super(props);

  }

render(){
    return (

                <NavbarDefault>
                    
                    <NavFlex>
                        <NavTitle>
                          {this.props.title}
                        </NavTitle>
                        {/* <NavSub>
                        USING EMAIL ADDRESS
                        </NavSub> */}
                    </NavFlex>    
                      
                </NavbarDefault>
    )
}
}