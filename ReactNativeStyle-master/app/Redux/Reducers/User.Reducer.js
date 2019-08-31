export const SAMPLE = 'SAMPLE';
export const LOGIN = 'LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SIGNUP = 'SIGNUP';
export const VERIFY = 'VERIFY';
export const LOADING = 'LOADING';
export const LOGOUT = 'LOGOUT';
export const DENTIST_PROFILE = 'DENTIST_PROFILE';
export const PROVINCE = 'PROVINCE';
export const FORGET_PASS = 'FORGET_PASS';
export const SET_PASS = 'SET_PASS';
export const ASSISTANT_LIST = 'ASSISTANT_LIST';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const CHECK_PHONE = 'CHECK_PHONE';
export const ADD_ASSISTANT = 'ADD_ASSISTANT';
export const CHANGE_PASS = 'CHANGE_PASS';
export const WALLET = 'WALLET';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const ACCOUNTING_LIST = 'ACCOUNTING_LIST';
export const ACCESS_LIST = 'ACCESS_LIST';

import Snackbar from 'react-native-snackbar';


let UserDataState = {
    loading: false,
    loggedIn: false,
    associate:{},
    signupMode: '',
    userType: '',
    token: '',
    refreshToken: '',
    mobileNumber: '',
    verificationToken: '',
    firstName: '',
    labName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    userType: '', // LABORATORY_ADMIN, DENTIST, LABORATORY_TECHNICIAN, SYS_ADMIN, DENTIST_ASSISTANT
    username: '',
    province: [],
    accountingList: [],
    assistants: [],
    wallet:0,
    profile: {
        user: {
            profilePic:{
                profilePicUrl:''
            }
        },
        address: {},
        contact: {},
        addressList: []
    },
    phoneState: false,
    assistantDetail: {
        user: {
            firstname: '',
            id: '',
            lastname: '',
            type: ''
        }
    },
};


export const UserReducer = (state = UserDataState, action) => {
    switch (action.type) {
        case LOGIN:
            state = Object.assign({}, state, {
                type: LOGIN,
                loading: action.loading,
                userType: action.userType,
                loggedIn: action.loggedIn
            });
            return state;
        case SIGNUP:
            state = Object.assign({}, state, {
                type: SIGNUP,
                loading: action.loading,
                userType: action.userType,
                signupMode: action.signupMode,
            });
            return state;
        case VERIFY:
            state = Object.assign({}, state, {
                type: VERIFY,
                loading: action.loading,
                userType: action.userType,
                token: action.token,
                signupMode: action.signupMode,
                refreshToken: action.refreshToken,
                loggedIn: action.loggedIn
            });
            return state;
        case CHECK_LOGIN:
            state = Object.assign({}, state, {
                type: CHECK_LOGIN,
                loading: action.loading,
                loggedIn: action.loggedIn,
                userType: action.userType
            });
            return state;
        case DENTIST_PROFILE:
            state = Object.assign({}, state, {
                type: DENTIST_PROFILE,
                loading: action.loading,
                profile: action.profile
            });
            return state;
        case LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case LOGOUT:
            state = Object.assign({}, state, {
                loggedIn: action.loggedIn,
            });
            return state;
        case PROVINCE:
            state = Object.assign({}, state, {
                loading: action.loading,
                province: action.province
            });
            return state;
        case FORGET_PASS:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case SET_PASS:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case ASSISTANT_LIST:
            state = Object.assign({}, state, {
                assistants: action.assistants,
            });
            return state;
        case CHANGE_PASS:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case ADD_ASSISTANT:
            state = Object.assign({}, state, {
                assistants: state.assistants.concat(action.assistant),
            });
            return state;
        case WALLET:
            state = Object.assign({}, state, {
                wallet: action.wallet,
            });
            return state;
        case UPLOAD_PICTURE:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case ACCOUNTING_LIST:
            state = Object.assign({}, state, {
                accountingList: action.accountingList,
            });
            return state;
        case ACCESS_LIST:
            state = Object.assign({}, state, {
                associate: action.associate,
                loading: action.loading,
            });
            return state;
        case CHECK_PHONE:
            if (action.phoneState == 'ALREADY_EXIST_DENTIST_ASSISTANT') {
                Snackbar.show({
                    title: 'این کاربر جزو دستیار های شما می باشد',
                    duration: 7000,
                });
                state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState: false
                });
                return state;
            } else if (action.phoneState == 'NOT_VALID_DENTIST_ASSISTANT') {
                Snackbar.show({
                    title: 'این کاربر نقش دیگری در سیستم دارد بنابراین نمی تواند جزو دستیار های شما باشد',
                    duration: 7000,
                });
                state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState: false
                });
                return state;
            } else if (action.phoneState == 'CAN_REGISTER_DENTIST_ASSISTANT') {
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست دستیار های خود اضافه کنید',
                    duration: 7000,
                });

                state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState: true,
                    assistantDetail: {
                        user: {
                            firstname: '',
                            id: '',
                            lastname: '',
                            type: ''
                        }
                    }
                });
                return state;

            } else if (action.phoneState == 'ALREADY_EXIST_DENTIST_ASSISTANT_IN_DELETED_LIST') {
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست دستیار های خود اضافه کنید.این کاربر قبلا جزو دستیار های شما بود',
                    duration: 7000,
                });
                state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState: true,
                    assistantDetail: action.assistantDetail
                });
                return state;

            } else if (action.phoneState == 'CAN_ADD_DENTIST_ASSISTANT') {
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست تکنسین های خود اضافه کنید.',
                    duration: 7000,
                });
                state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState: true,
                    assistantDetail: action.assistantDetail
                });
                return state;

            }

        case EDIT_PROFILE:
            state = Object.assign({}, state, {
                loading: action.loading,
                profile: {
                    user: {
                        firstname: action.user.firstname,
                        lastname: action.user.lastname
                    },
                    contact: action.user.contact,
                    address: state.profile.address,
                    addressList: action.user.addressList
                }
            });
            return state;
        default:
            return state;
    }
}