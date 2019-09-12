import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


import {
    BASE_URL,
    RESPONSES
} from './helperConstants'




/**Checks if user is logged in (jwt authToken)
 * @returns {boolean} true if logged in else false.
 */

export async function userIsLoggedIn(){
    try{
        let authToken = await AsyncStorage.getItem('authToken')
        if(authToken !== null){
            let res = await axios({
                method: 'GET',
                url: BASE_URL,
                headers : {
                    Authorization : authToken
                }
            })
            if(res.data.hasOwnProperty(userAuthState))
                return res.data.userAuthState
        }
        return false;
    }catch(e){
        console.log('userIsLoggedIn: ', e)
        return false
    }
}



/**Checks if user is logged in (jwt authToken)
 * @returns {boolean} true if logged in else false.
 */
export async function getUserLogInState(authToken){
    return new Promise( async (resolve, reject) =>{
        try{
           
            console.log("authToken at getUserLogInState: ", authToken)
        if(authToken !== null){
            let res = await axios({
                method: 'GET',
                url: BASE_URL,
                headers : {
                    Authorization : authToken
                }
            })
            if(res.data.hasOwnProperty('userAuthState')){
                resolve(res.data.userAuthState)
            }
            else { 
                reject(RESPONSES.NOT_AUTHENTICATED)
            }
        }else{
            reject(RESPONSES.NOT_AUTHENTICATED)
        }
    }catch(e){
        console.log("Caught exception at getUserLogInState: " + JSON.stringify(e))
        reject(RESPONSES.NOT_AUTHENTICATED)
    }
    })
}



/*
* Gets the current user.
* @param {string} authToken
* @returns {Object} current user object.
**/
export async function getCurrentUser(authToken){
    return new Promise(async (resolve, reject) =>{
        try{
            let res = await axios({
                method: 'GET',
                url: BASE_URL + '/user',
                headers: {
                    Authorization : authToken
                }
            })
            console.log(JSON.stringify(res.data))
            if(res.data.hasOwnProperty('u_id')){
                console.log("success")
                resolve(res.data)
            }else{
                console.log("error at axios: getCurrentUser")
                reject(RESPONSES.NOT_AUTHENTICATED)
            }
        }catch(e){
            console.log("error at getCurrentUser: " + JSON.stringify(e))
            reject(RESPONSES.NOT_AUTHENTICATED)
        }
    })
}


// export async function getUserLogInState(){
//     try{
//         let authToken = await AsyncStorage.getItem('authToken')
//         if(authToken !== null){
//             let res = await axios({
//                 method: 'GET',
//                 url: BASE_URL,
//                 headers : {
//                     Authorization : authToken
//                 }
//             })
//             if(res.data.hasOwnProperty(userAuthState))
//                 return res.data.userAuthState
//         }
//         return false;
//     }catch(e) {
//         console.log('userIsLoggedIn: ', e)
//         return false
//     }
// }







/**
* Signs up the user.
* @param {string} email user's email
* @param {string} password user's password
* @returns {object} response if error => ERR_SIGNUP else => SUCCESS
 */


export async function userSignUp(email, password){
    let response = RESPONSES.SUCCESS;
    try{
        let res = await axios({
            url: BASE_URL + '/auth/signup',
            method: 'POST',
            data: {
                email : email,
                password: password
            }
        })
        console.log(res)
        return res.data

    }catch(error){
        console.log("userSignup error line 33: ", error)
        return RESPONSES.ERR_CONNECTION
    }
 }


