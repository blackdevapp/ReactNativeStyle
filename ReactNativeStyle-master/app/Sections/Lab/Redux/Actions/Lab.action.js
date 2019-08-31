export const REQUSTED_SUBSCRIBER = 'REQUSTED_SUBSCRIBER';
export const SUBSCRIBER = 'SUBSCRIBER';
export const MY_PRICE_CLASS = 'MY_PRICE_CLASS';
export const SEND_PRICE_CLASS = 'SEND_PRICE_CLASS';
export const DENTAL_SERVICE = 'DENTAL_SERVICE';
export const MY_PRICE_CLASS_ITEM = 'MY_PRICE_CLASS_ITEM';
export const CLINICS_ORDER = 'CLINICS_ORDER';
export const CLINICS_ORDER_LIST = 'CLINICS_ORDER_LIST';
export const BILL_DOCTOR = 'BILL_DOCTOR';
export const GET_LAB = 'GET_LAB';
export const BILL_LIST = 'BILL_LIST';
export const GET_COWORKERS = 'GET_COWORKERS';
export const GET_TECHS = 'GET_TECHS';
export const INVITE = 'INVITE';
export const BILL_PAY = 'BILL_PAY';
export const DELETE_TECH = 'DELETE_TECH';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const CHECK_PHONE_LAB = 'CHECK_PHONE_LAB';
export const ADD_EXIST_TECH = 'ADD_EXIST_TECH';

import Snackbar from 'react-native-snackbar';

import httpService from '../../../../Services/Http.service'
import storageService from '../../../../Services/Storage.service'
var moment = require('moment-jalaali')
export function getRequestedSubscribers() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/subscribers?status=REQUESTED`).then(res => {
                dispatch({
                    type: REQUSTED_SUBSCRIBER,
                    loading: false,
                    requestedSubscribers: res.data.data
                })
            }).catch(err => {
                if (err.response.status == 422) {
                    dispatch({
                        type: REQUSTED_SUBSCRIBER,
                        loading: false,
                        requestedSubscribers: []
                    })
                } else {
                    alert(JSON.stringify(err.response))
                }
            })
        })

    }
}
export function getSubscribers() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/subscribers?status=ACCEPTED`).then(res => {
                // alert(JSON.stringify(res, null, 4))
                dispatch({
                    type: SUBSCRIBER,
                    loading: false,
                    subscribers: res.data.data
                })
            }).catch(err => {
                if (err.response.status == 422) {
                    dispatch({
                        type: SUBSCRIBER,
                        loading: false,
                        subscribers: []
                    })
                } else {
                    alert(JSON.stringify(err.response))
                }
            })
        })


    }
}

export function myPriceClasses() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/price-classes`).then(res => {
                dispatch({
                    type: MY_PRICE_CLASS,
                    loading: false,
                    priceClasses: res.data.data

                })
            }).catch(err => {
                alert(JSON.stringify(err.response))
            })
        })


    }
}
export function myPriceClasseItem() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/price-classes`).then(res => {
                let classList = [];
                for (let i = 1; i <= res.data.data.length; i++) {
                    httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/price-classes/${res.data.data[i - 1].id}`).then(res1 => {
                        classList.push(res1.data.data)
                        // alert(JSON.stringify(res1,null,5))
                        if (res.data.data.length == i) {

                            dispatch({
                                type: MY_PRICE_CLASS_ITEM,
                                loading: false,
                                classes: classList,
                                priceClasses: res.data.data

                            })
                        }
                    }).catch(err => {
                        alert(err)
                    })
                }

            }).catch(err => {
                alert(JSON.stringify(err.response))
            })
        })


    }
}

export function sendPriceClass(priceClass, dentistId) {
    return (dispatch) => {
        // idandoon/laboratories/5bba73c65694d50fbe642e63/subscribers/5bba70f05694d50fbe642e61
        storageService.getItem('decoded').then(info => {
            httpService.httpPutJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/subscribers/${dentistId}`, priceClass).then(res => {
                dispatch({
                    type: SEND_PRICE_CLASS,
                    loading: false,
                })
            }).catch(err => {

                alert(JSON.stringify(err.response))

            })
        })


    }
}

export function getDentalServices() {
    return (dispatch) => {
        httpService.httpGetJwt('idandoon/dentalservices').then(res => {
            let products=[];
            for(let item of res.data.data){
                if(item.productDescriptions){
                    for(let sub of item.productDescriptions){
                        products.push(sub)
                    }
                }
            }
            dispatch({
                type: DENTAL_SERVICE,
                loading: false,
                dentalService: res.data.data,
                products:products

            })
        })
    }
}

export function getClinicsOrder() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/clinics`).then(res => {
                // alert(JSON.stringify(res))
                dispatch({
                    type: CLINICS_ORDER,
                    loading: false,
                    clinics: res.data.data

                })
            }).catch(err => {
                alert(JSON.stringify(err.response))
            })
        })
    }
}
export function getOrderByClinicId(clinic_id) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/clinics/${clinic_id}/orders`).then(res => {

                for (let item of res.data.data) {
                    m = moment(item.orderedDate.substring(0, 10), 'YYYY/M/D')
                    item.orderedDate = m.format('jYYYY/jM/jD') + ' ' + item.orderedDate.substring(11, 16)
                }
                dispatch({
                    type: CLINICS_ORDER_LIST,
                    loading: false,
                    clinicOrders: res.data.data
                })
            }).catch(err => {
                alert(JSON.stringify(err.response))
            })
        })
    }
}
// idandoon/laboratories/5bba73c65694d50fbe642e63/clinics/5bba70f05694d50fbe642e61/bills
export function getBillDetail(clinic_id, from, to) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/clinics/${clinic_id}/bills`).then(res => {
                console.log(res);
                dispatch({
                    type: BILL_DOCTOR,
                    loading: false,
                    doctorOrders: res.data.data
                })
            }).catch(err => {
                if (err.response.status == 422) {
                    dispatch({
                        type: BILL_DOCTOR,
                        loading: false,
                        doctorOrders: {
                            billItems: []
                        }
                    })
                } else {
                    alert(JSON.stringify(err.response))
                }
            })
        })
    }
}
export function getLab() {


    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}`).then(res => {
                console.log(res);
                if(res.data.data.address.state){
                    httpService.httpGetJwt('idandoon/map/provinces').then(response=>{
                        for(let item of response.data.data){
                            if(item.id==res.data.data.address.state){
                                res.data.data.address.stateTitle=item.title
                                // idandoon/map/provinces/59bb8e1abf0c81715158a345/cities
                                httpService.httpGetJwt(`idandoon/map/provinces/${item.id}/cities`).then(city=>{
                                    for(let sub of city.data.data){
                                        if(sub.id==res.data.data.address.city){
                                            res.data.data.address.cityTitle=sub.city
                                            dispatch({
                                                type:GET_LAB,
                                                loading:false,
                                                laboratory: res.data.data,
                                                province:response.data.data
                                            })
                                        }
                                    }
                                    
                                }).catch(err=>{
                                    console.log(err);
                                })
                            }
                        }
                        
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    dispatch({
                        type:GET_LAB,
                        loading:false,
                        laboratory: res.data.data,
                    })
                }
               
            }).catch(err=>{
                if(err.response.status==500){
                    Snackbar.show({
                        title: 'خطا در برقراری اتصال به سرور',
                        duration: 4000,
                      });
                }
                console.log(err);
            })
        })
    }
}

export function getAllLabBills(){
    return (dispatch)=>{
        httpService.httpGetJwt('idandoon/laboratories/bills').then(res=>{
            for(let item of res.data.data.content){
                if(item.from){
                    m = moment(item.from.substring(0.10), 'YYYY/M/D')
                    item.from = m.format('jYYYY/jM/jD')
                }
                if(item.to){
                    m = moment(item.to.substring(0.10), 'YYYY/M/D')
                    item.to = m.format('jYYYY/jM/jD')
                }
                m = moment(item.billGenerationDate.substring(0.10), 'YYYY/M/D')
                item.billGenerationDate = m.format('jYYYY/jM/jD')
            }
            dispatch({
                type:BILL_LIST,
                loading:false,
                bills:res.data.data.content,
            })

        })
    }
}
export function getCoWorkers(){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/order-count-and-bills`).then(res => {
                dispatch({
                    type: GET_COWORKERS,
                    myCoWorker:res.data.data
                })
            })
        })
        
    }
}

export function getAllTech(){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/technicians`).then(res => {
                console.log(res);
                dispatch({
                    type: GET_TECHS,
                    techs:res.data.data
                })
            })
        })
    }
}
export function deleteTech(id){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/technicians/${id}`).then(res => {
                dispatch({
                    type: DELETE_TECH,
                    loading:false,
                    id:id
                })
            }).catch(err=>{
                if(err.response.status==500){
                    Snackbar.show({
                        title: 'خطا در حذف تکنسین',
                        duration: 7000,
                      });
                }else{
                    console.log(JSON.stringify(err))
                }
            })
        })
    }
}
export function invite(phone){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/invite/${JSON.parse(info).context.id}/${phone}`).then(res => {
                dispatch({
                    type: INVITE,
                    loading:false
                })
            })
        })
    }
}


export function editProfile(profile){
    return (dispatch)=>{
        storageService.getItem('decoded').then(info=>{
            httpService.httpPutJwt(`idandoon/laboratories/${JSON.parse(info).context.id}`,profile).then(res=>{
                storageService.getItem('decoded').then(info => {
                    httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}`).then(res => {
                        httpService.httpGetJwt('idandoon/map/provinces').then(response=>{
                            for(let item of response.data.data){
                                if(item.id==res.data.data.address.state){
                                    res.data.data.address.stateTitle=item.title
                                    // idandoon/map/provinces/59bb8e1abf0c81715158a345/cities
                                    httpService.httpGetJwt(`idandoon/map/provinces/${item.id}/cities`).then(city=>{
                                        for(let sub of city.data.data){
                                            if(sub.id==res.data.data.address.city){
                                                res.data.data.address.cityTitle=sub.city
                                                dispatch({
                                                    type:GET_LAB,
                                                    loading:false,
                                                    laboratory: res.data.data,
                                                    province:response.data.data
                                                })
                                            }
                                        }
                                        
                                    })
                                }
                            }
                            
                        })
                    })
                })
                // alert(JSON.stringify(res,null,5))
                // dispatch({
                //     type:EDIT_PROFILE,
                //     profile:profile
                // })
            }).catch(err=>{
                alert(JSON.stringify(err,null,5))
            })
        })
        
        
    }
}
export function getBillPays(){
    // http://89.32.249.208:8090/idandoon/laboratories/bills/?status=PAYED&checkout=NOT_CHECKOUT&page=0&limit=10&clinicId=&lab_id=5bba73c65694d50fbe642e63
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/bills/?status=PAYED&clinicId=&lab_id=${JSON.parse(info).context.id}`).then(res => {
                dispatch({
                    type: BILL_PAY,
                    loading:false
                })
            })
        })
    }
}
export function checkPhoneNumber(phone){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/technicians/check-and-get?mobile_number=${phone}`).then(res => {
                // console.log(res);
                if(res.data.data){
                    dispatch({
                        type: CHECK_PHONE_LAB,
                        loading:false,
                        phoneState:res.data.states[0].keyword,
                        techDetail:res.data.data 
                    })
                }else{
                    dispatch({
                        type: CHECK_PHONE_LAB,
                        loading:false,
                        phoneState:res.data.states[0].keyword
                    })
                }
                
            }).catch(err=>{
                Snackbar.show({
                    title: 'خطا در برقراری اتصال به سرور',
                    duration: 4000,
                    backgroundColor:'red'
                  });
                console.log(err)
            })
        })
    }
}
export function addExistTech(tech){
    console.log(tech)
    // idandoon/laboratory-technicians
    return (dispatch) => {
            httpService.httpPostJwt(`idandoon/laboratory-technicians`,JSON.stringify(tech)).then(res => {
                if(res){
                    storageService.getItem('decoded').then(info => {
                        httpService.httpGetJwt(`idandoon/laboratories/${JSON.parse(info).context.id}/technicians`).then(res => {
                            dispatch({
                                type: ADD_EXIST_TECH,
                                loading:false,
                                techs:res.data.data
                            })
                        }).catch(err=>{
                            console.log(JSON.stringify(err))
                        })
                    })
                }
            }).catch(err=>{
                console.log(JSON.stringify(err))
            })
    }
}
