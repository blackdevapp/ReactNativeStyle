export const SAMPLE = 'SAMPLE';
export const LOGIN = 'LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SIGNUP = 'SIGNUP';
export const VERIFY = 'VERIFY';
export const DENTIST_PROFILE = 'DENTIST_PROFILE';
export const LOADING = 'LOADING';
export const LOGOUT = 'LOGOUT';
export const PROVINCE = 'PROVINCE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const FORGET_PASS = 'FORGET_PASS';
export const ASSISTANT_LIST = 'ASSISTANT_LIST';
export const ADD_ASSISTANT = 'ADD_ASSISTANT';
export const CHECK_PHONE = 'CHECK_PHONE';
export const CHANGE_PASS = 'CHANGE_PASS';
export const WALLET = 'WALLET';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const ACCOUNTING_LIST = 'ACCOUNTING_LIST';
export const ACCESS_LIST = 'ACCESS_LIST';
import Snackbar from 'react-native-snackbar';
import { Platform } from 'react-native';

import Pushe from 'react-native-pushe'


import httpService from '../../Services/Http.service'
import storageService from '../../Services/Storage.service'
export function login(user) {

    return (dispatch) => {
        httpService.httpPost('auth/login', user).then(data => {
            if (!data.errorFlag) {
                var jwtDecode = require('jwt-decode');
                storageService.saveItem('token', data.data.accessToken.token).then(() => {
                    storageService.saveItem('decoded', JSON.stringify(jwtDecode(data.data.accessToken.token))).then(() => {
                        // console.log(JSON.stringify(jwtDecode(data.data.accessToken.token).context.type))
                        storageService.saveItem('refreshToken', data.data.refreshToken.token).then(() => {
                            if (data.data.pusheId !== null) {
                                dispatch({
                                    type: LOGIN,
                                    loading: false,
                                    userType: jwtDecode(data.data.accessToken.token).context.type,
                                    loggedIn: true
                                });
                            } else {
                                if (Platform.OS !== 'ios') {
                                    Pushe.getPusheId((pusheId) => {
                                        httpService.httpGetJwt(`update-pushe-id/${pusheId}`).then(res => {
                                            dispatch({
                                                type: LOGIN,
                                                loading: false,
                                                userType: jwtDecode(data.data.accessToken.token).context.type,
                                                loggedIn: true
                                            });
                                        })
                                    });
                                } else {
                                    dispatch({
                                        type: LOGIN,
                                        loading: false,
                                        userType: jwtDecode(data.data.accessToken.token).context.type,
                                        loggedIn: true
                                    });
                                }

                            }

                        })
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            if (err.response) {
                if (err.response.status == 400 || err.response.status == 401) {
                    Snackbar.show({
                        title: 'نام کاربری یا رمز عبور وارد شده صحیح نمی باشد',
                        duration: 5000,
                        backgroundColor: 'red'
                    });
                    dispatch({
                        type: LOGIN,
                        loading: false,
                        userType: user.userType,
                        loggedIn: false
                    });

                } else {
                    dispatch({
                        type: LOGIN,
                        loading: false,
                        userType: user.userType,
                        loggedIn: false
                    });
                }
            } else {
                Snackbar.show({
                    title: 'خطا در برقراری اتصال به سرور . لطفا بعدا تلاش فرمایید',
                    duration: 5000,
                    backgroundColor: 'red'
                });
                dispatch({
                    type: LOGIN,
                    loading: false,
                    loggedIn: false
                });
            }

            // alert(JSON.stringify(err.response,null,5))

        })

    };
}

export function signup(user) {
    return (dispatch) => {
        httpService.httpPost('register', user).then(data => {
            console.log(data.errorFlag)
            if (data.errorFlag == false) {
                Snackbar.show({
                    title: 'کد فعال سازی تا ثانیه های دیگر برای شما ارسال می شود',
                    duration: 5000,
                    // backgroundColor:'red'
                });
                dispatch({
                    type: SIGNUP,
                    loading: false,
                    userType: user.userType,
                    signupMode: 'verify'
                });
            }

        }).catch(err => {
            alert(JSON.stringify(err))
        })

    };
}

export function verify(verify) {
    return (dispatch) => {
        httpService.httpPost('verification', verify).then(data => {
            if (data) {
                Snackbar.show({
                    title: 'ثبت نام با موفقیت انجام شد!',
                    duration: 5000,
                });
                dispatch({
                    type: VERIFY,
                    loading: false,
                    userType: '',
                    signupMode: '',
                    token: '',
                    refreshToken: '',
                    loggedIn: false
                });
            }

        }).catch(err => {
            Snackbar.show({
                title: 'کد وارد شده صحیح نمی باشد!',
                duration: 5000,
            });
        })

    };
}

export function checkLogin() {
    return (dispatch) => {

        storageService.getItem('refreshToken').then(token => {
            if (token) {
                httpService.httpPost('auth/token', { refresh_token: token }).then(res => {
                    storageService.saveItem('token', res.data.token).then(() => {
                        var jwtDecode = require('jwt-decode');
                        storageService.saveItem('decoded', JSON.stringify(jwtDecode(res.data.token))).then(() => {
                            dispatch({
                                type: CHECK_LOGIN,
                                loading: false,
                                loggedIn: true,
                                userType: jwtDecode(res.data.token).context.type
                            });
                        })
                        // alert(JSON.stringify(jwtDecode(res.data.token)))

                    }).catch(err => {

                        dispatch({
                            type: CHECK_LOGIN,
                            loading: false,
                            loggedIn: false
                        });
                    })

                }).catch(err => {
                    console.log(err)
                    dispatch({
                        type: CHECK_LOGIN,
                        loading: false,
                        loggedIn: false
                    });
                })

            } else {
                dispatch({
                    type: CHECK_LOGIN,
                    loading: false,
                    loggedIn: false
                });
            }
        }).catch(err => {
            dispatch({
                type: CHECK_LOGIN,
                loading: false,
                loggedIn: false
            });
        })
    }
}

export function dentistProfile() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/clinics/${JSON.parse(info).context.id}`).then(res => {
                dispatch({
                    type: DENTIST_PROFILE,
                    loading: false,
                    profile: res.data.data
                });
            })
        })
    }
}
export function showLoading() {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            loading: true,
        });
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
            loggedIn: false,
        })
    }
}

export function getProvince() {
    return (dispatch) => {
        httpService.httpGetJwt('idandoon/map/provinces').then(res => {
            dispatch({
                type: PROVINCE,
                loading: false,
                province: res.data.data
            })
        })

    }
}

export function editProfile(user) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpPutJwt(`idandoon/clinics/${JSON.parse(info).context.id}/dentist-profile-update`, user).then(res => {
                // alert(JSON.stringify(res,null,5))
                dispatch({
                    type: EDIT_PROFILE,
                    loading: false,
                    user: user
                })
            }).catch(err => {
                alert(JSON.stringify(err, null, 5))
            })
        })


    }
}

// idandoon/users/5c0764b45694d55817b3e330/profile-picture
export function profilePic(file, contentType) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.upload(`idandoon/users/${JSON.parse(info).context.id}/profile-picture`, file, contentType).then(res => {
                // alert(JSON.stringify(res,null,5))
                console.log(res);
                dispatch({
                    type: UPLOAD_PICTURE,
                    loading: false
                })
            }).catch(err => {
                alert(JSON.stringify(err, null, 5))
            })
        })


    }
}
export function forgetPass(username) {
    return (dispatch) => {
        httpService.httpPostJwt(`forgotPassword?username=${username}`, {}).then(res => {
            Snackbar.show({
                title: 'کد فعال سازی تا ثانیه های دیگر برای شما ارسال می شود!',
                duration: 5000
            });
            dispatch({
                type: FORGET_PASS,
                loading: false,
            })
        }).catch(err => {
            console.log(err)
        })

    }
}

// http://89.32.249.208:8090/resetPassword?verificationToken=4323&username=09910760978
// newPassword: "Asd1234%"
// newPasswordConfirmation: "Asd1234%"
export function setNewPass(code, phone, entity) {
    return (dispatch) => {
        httpService.httpPostJwt(`resetPassword?username=${phone}&verificationToken=${code}`, entity).then(res => {
            Snackbar.show({
                title: 'رمز عبور با موفقیت عوض شد',
                duration: 5000
            });
            dispatch({
                type: SET_PASS,
                loading: false,
            })
        }).catch(err => {
            console.log(err)
        })

    }
}

// idandoon/dentist-assistant/5c0764b45694d55817b3e330/dentist-assistant/get-dentist-assistant-list
export function getAssistant() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/dentist-assistant/${JSON.parse(info).context.id}/dentist-assistant/get-dentist-assistant-list`).then(res => {
                // alert(JSON.stringify(res.data.data,null,5))
                console.log(res.data)
                dispatch({
                    type: ASSISTANT_LIST,
                    loading: false,
                    assistants: res.data
                });
            })
        })
    }
}
// idandoon/laboratories/credit/5c0765bd5694d55817b3e332
export function getAccount() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/credit/${JSON.parse(info).context.id}`).then(res => {
                // alert(JSON.stringify(res.data.data,null,5))
                console.log(res.data)
                dispatch({
                    type: WALLET,
                    loading: false,
                    wallet: res.data.data
                });
            })
        })
    }
}

// idandoon/dentist-assistant/5c0764b45694d55817b3e330/dentist-assistant/register-or-add

// address: {id: "5c077a605694d55817b3e34c",…}
// firstName: "sasd"
// lastName: "sadsd"
// username: "09123456789"

export function addAssistant(user) {
    return (dispatch) => {
        user.id = ''
        storageService.getItem('decoded').then(info => {
            httpService.httpPostJwt(`idandoon/dentist-assistant/${JSON.parse(info).context.id}/dentist-assistant/register-or-add`, user).then(res => {
                // alert(JSON.stringify(res.data.data,null,5))
                console.log(res)
                dispatch({
                    type: ADD_ASSISTANT,
                    loading: false,
                    assistant: user
                });
            })
        })
    }
}


// idandoon/dentist-assistant/5c0764b45694d55817b3e330/dentist-assistant/check-and-get?mobile_number=09123456789

export function checkPhoneNumber(phone) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/dentist-assistant/${JSON.parse(info).context.id}/dentist-assistant/check-and-get?mobile_number=${phone}`).then(res => {
                console.log(res);
                if (res.data.data) {
                    dispatch({
                        type: CHECK_PHONE,
                        loading: false,
                        phoneState: res.data.states[0].keyword,
                        assistantDetail: res.data.data
                    })
                } else {
                    dispatch({
                        type: CHECK_PHONE,
                        loading: false,
                        phoneState: res.data.states[0].keyword
                    })
                }

            })
        })
    }
}

export function addExistAssistant(assistant) {
    console.log(assistant)
    // return (dispatch) => {
    //         httpService.httpPostJwt(`idandoon/laboratory-technicians`,JSON.stringify(tech)).then(res => {
    //             if(res){
    //                 storageService.getItem('decoded').then(info => {
    //                     httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/technicians`).then(res => {
    //                         dispatch({
    //                             type: ADD_EXIST_TECH,
    //                             loading:false,
    //                             techs:res.data.data
    //                         })
    //                     }).catch(err=>{
    //                         console.log(JSON.stringify(err))
    //                     })
    //                 })
    //             }
    //         }).catch(err=>{
    //             console.log(JSON.stringify(err))
    //         })
    // }
}


// newPassword: "Asd1234%"
// newPasswordConfirmation: "Asd1234%"
// password: "Asd12345%"
export function changePass(pass) {
    return (dispatch) => {
        httpService.httpPostJwt(`changePassword`, pass).then(res => {
            console.log(res);
            Snackbar.show({
                title: 'رمز عبور شما با موفقیت تغییر یافت',
                duration: 5000
            });
            dispatch({
                type: CHANGE_PASS,
                loading: false,
            })
        }).catch(err => {
            console.log(err)
        })

    }
}
// idandoon/laboratories/{lab_id}/accounting-list
export function getAccountingList() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/accounting-list`).then(res => {
                console.log(res);
                dispatch({
                    type: ACCOUNTING_LIST,
                    loading: false,
                    accountingList: res.data.data
                })
            }).catch(err => {
                console.log(err)
            })
        })


    }
}
// idandoon/laboratory-payed-request/create
export function payRequest(account) {

}


export function getAccessList(id) {
    return (dispatch) => {
        // storageService.getItem('decoded').then(info => {
        //     httpService.httpGetJwt(`idandoon/dentist-assistant/${JSON.parse(info).context.id}/dentist-assistant/get-dentist-assistant-list`).then(res=>{
        //         console.log(res);
        //         dispatch({
        //             type:ACCESS_LIST,
        //             loading:false,
        //             accessList:res.data.data
        //         })
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // })
        httpService.httpGetJwt(`idandoon/dentist-assistant/clinics/${id}/get-dentist`).then(res => {
            console.log(res);
            dispatch({
                type: ACCESS_LIST,
                loading: false,
                accessList: res.data.data
            })
        }).catch(err => {
            console.log(err)
        })


    }
}




// @RequestMapping("/idandoon/dentist-assistant/")

// @GetMapping("/{clinic_id}/dentist-assistant/get-dentist-assistant-list")






// @RequestMapping("/idandoon/dentist-assistant/")
// @PutMapping("/{dentist_assistant_id}/dentist-assistant/edit-role")
// @PathVariable("dentist_assistant_id") String dentistAssistantId,
// @RequestBody List<DentistAssistantRole> dentistAssistantRoleList

// return boolean

// ویراش دسترسیهای یک دستیار توسط دکتر





// @RequestMapping("/idandoon/dentist-assistant/")
// @GetMapping("/{dentist_assistant_id}/get-dentist-list")
// @PathVariable("dentist_assistant_id") String dentistAssistantId

// retutn List<WorkPlace>

// برگشتی لیست دکترهای این دستیار همراه با دسترسی هاش





// public enum DentistAssistantRole {
//     NEW_ORDER, REPORT, BILL, LAB_SEARCH, ORDER_MANAGEMENT





//     public class DentistAssistant {
//         private String id;
//         private String workPlaceId;
//         private List<String> addressIdList;
//         private Date connectionDate;
//         private String firstName;
//         private String lastName;
//         private String profilePicUrl;