import axios from 'axios'
import {
    BASE_URL,
    RESPONSES
} from './helperConstants'

import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USER_DESC_MAX_LENGTH
} from './lengthConstants'

import AsyncStorage from '@react-native-community/async-storage';




/**
 * Checks the validity of email address
 * and available by making an api call.
 * @param {string} email to check against.
 * @returns {Promise} resolves res.data from api.
 */
 export async function checkEmailAddress(email){
    return new Promise(async (resolve, reject) =>{
        if(email === '' || email === null) reject(RESPONSES.EMAIL_FORMAT)
        email = email.toLowerCase().trim()
        let response = RESPONSES.ERR_SYSTEM
        const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.length < 4){
            reject(RESPONSES.EMAIL_LENGTH)
        }
        else if(!(emailExpression.test(email))){
            reject(RESPONSES.EMAIL_FORMAT)
        }
        else{
            try{
                let res = await axios({
                url : BASE_URL + '/auth/check_email_address',
                method: 'GET',
                params : {
                    email
                }
            })
            resolve(res.data)
            }catch(e){
                 console.log(new Error().stack.split(/\r\n|\r|\n/g)[1].trim(), e)
                reject(RESPONSES.ERR_CONNECTION)
            }
        }
    })
 }


/**
 * Checks the validity of password.
 * @param {string} password to check against.
 * @returns {Promise}
 */

export async function checkPassword(password){
    return new Promise((resolve, reject) => {
        if(password === null || password.length < 8) reject(RESPONSES.PASSWORD_LENGTH)
        else resolve(RESPONSES.SUCCESS)
    })
}  


export async function checkUserProfileFields(name, username, userDescription){
    return new Promise((resolve, reject) =>{
        if(name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH){
            reject(RESPONSES.NAME_LENGTH)
        }else if(username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH){
            reject(RESPONSES.USERNAME_LENGTH)
        }else if(userDescription.length > USER_DESC_MAX_LENGTH){
            reject(RESPONSES.USER_DESC_LENGTH)
        }
        else resolve(RESPONSES.SUCCESS)
    })
}

/**
 * Checks the validity of username
 * and available by making an api call.
 * @param {string} username to check against.
 * @returns {Promise} resolves res.data from api.
 */
export async function checkUsername(username){
    return new Promise(async (resolve, reject) => {
//username regex expression
    const usernameExpression = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]+$/
    //trim any spaces
    username = username.trim().toLowerCase()
    //min length = 2
    if(
        username.length < USERNAME_MIN_LENGTH ||
        username.length > USERNAME_MAX_LENGTH
    ) {
         
        reject(RESPONSES.USERNAME_LENGTH)
    }
    else if(!usernameExpression.test(username)){

        reject(RESPONSES.USERNAME_FORMAT)
    }
        else{
            try{
                let res = await axios({
                    method: 'GET',
                    url: BASE_URL + '/auth/check_username',
                    params: {
                        username
                    }
                })
                if(res.data.hasOwnProperty("errorStatus")){
                    if(res.data.errorStatus){
                        console.log('username helpers: username has')
                        reject(res.data)
                    }else if(!res.data.errorStatus){
                        console.log('username helpers: username success')
                        resolve(res.data)
                    }
                }
                console.log('system error at - username helpers')
                reject(res.data)
              
            }catch(e){
                console.log('username helpers error catch:', e)
                reject(e)
            }
        }
    })
}

/*
* Inserts user data.
* @param {Object} userData : the user data object.
* @returns {Promise} resolves server response on success (res.data),
*  rejects if error or user not authenticated.
**/
export async function insertUserData(userData){
    return new Promise(async (resolve, reject) =>{
        try{
            let authToken = await AsyncStorage.getItem("authToken")
            if(authToken === "" || authToken == null || authToken.length < 10){
                reject(RESPONSES.NOT_AUTHENTICATED)
            }else{
                let res = await axios({
                    method: 'POST',
                    url: BASE_URL + "/user_data",
                    data : {
                        userData
                    },
                    headers: {
                        'Authorization' : authToken
                    }
                })
                if(res.data.hasOwnProperty("errorStatus")){
                    if(res.data.errorStatus){
                        reject(res.data)
                    }
                }
                resolve(res.data)
            }
        }catch(e){
            console.log(new Error().stack.split(/\r\n|\r|\n/g)[1].trim(), e)
        }
    })
}



export async function getPrimaryFieldType(primaryTF){
    return new Promise((resolve, reject) => {
        const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const usernameExpression = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]+$/
        if( emailExpression.test(primaryTF) ){
             resolve("email_address")
        }else if (usernameExpression.test(primaryTF)){
            resolve("username")
        }
        reject(RESPONSES.INVALID_PRIMARY_FIELD)
    })
    

}

export async function checkFields(primaryTF, passwordTF, primaryFieldType){
    return new Promise((resolve, reject) => {
        switch(primaryFieldType){
            case 'email_address': {
                if(primaryTF.length > 320 || passwordTF.length > 1000){
                    reject(RESPONSES.EMAIL_LOGIN_FAIL)
                }
                break;
            }
            case 'username' : {
                 if(primaryTF.length > USERNAME_MAX_LENGTH || passwordTF.length > 1000){
                    reject(RESPONSES.USERNAME_LOGIN_FAIL)
                }break;
            }
        }
        resolve(true)
    }) 
    
}


export async function logInUser(primaryTF, passwordTF, primaryFieldType){
    return new Promise(async (resolve, reject) =>{
        try{
            let res = await axios({
                method : 'POST',
                url : BASE_URL + '/auth/login',
                data : {
                    primaryField: primaryTF,
                    password : passwordTF,
                    primaryFieldType: primaryFieldType
                }
            })
            console.log("login user:", res.data)
            if(res.data.hasOwnProperty("authToken")){
                resolve(res.data.authToken)
            }else if(res.data.hasOwnProperty("errorStatus")){
                reject(res.data)
            }
            reject(RESPONSES.ERR_SYSTEM)
        }catch(e){
            if(e.hasOwnProperty("errorStatus")){
                reject(e)
            }
            reject(RESPONSES.ERR_SYSTEM)
        }
    })
}




