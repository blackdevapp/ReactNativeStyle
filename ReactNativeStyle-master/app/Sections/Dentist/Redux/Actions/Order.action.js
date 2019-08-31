export const CONNECTED_LABS = 'CONNECTED_LABS';
export const PRODUCTS = 'PRODUCTS';
export const DYNAMIC_FORM = 'DYNAMIC_FORM';
export const SHOW_FORM = 'SHOW_FORM';
export const PRICE_PLAN = 'PRICE_PLAN';
export const ORDER_MANAGEMENT = 'ORDER_MANAGEMENT';
export const CURRENT_ORDER = 'CURRENT_ORDER';
export const UPLOAD = 'UPLOAD';
export const ORDER_LINE_ITEM = 'ORDER_LINE_ITEM';
export const RESET_PRICE_PLAN = 'RESET_PRICE_PLAN';
export const GO_TO_PREVIEW = 'GO_TO_PREVIEW';
export const LOADING = 'LOADING';
export const SET_FORM = 'SET_FORM';
export const CREATE_ORDER = 'CREATE_ORDER';
export const GET_ADDRESS = 'GET_ADDRESS';
export const ORDERLINEITEMS_DOCTOR = 'ORDERLINEITEMS_DOCTOR';
export const CHANGE_STATUS = 'CHANGE_STATUS';
import Snackbar from 'react-native-snackbar';

import httpService from '../../../../Services/Http.service'
import storageService from '../../../../Services/Storage.service'
var moment = require('moment-jalaali')
export function getAllConnectedLabs() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info=>{
            httpService.httpGetJwt(`idandoon/clinics/${JSON.parse(info).context.id}/connected-labs-only-id-and-labname?product-name`)
            .then(res => {
                // alert(JSON.stringify(res.data.data,null,5))
                dispatch({
                    type: CONNECTED_LABS,
                    loading: false,
                    connectedLabs: res.data.data
                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })
        })
        

    };
}
export function getAllProductLabOrder(labId,classId) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/${labId}/price-classes/${classId}`)
            .then(res => {
                // alert(JSON.stringify(res,null,5))
                // let products = [];
                // for (let item of res.data.productCatalog.productDescriptions) {
                //     // for (let sub of item.productDescriptions) {
                //         products.push(sub)
                //     // }
                // }
                dispatch({
                    type: PRODUCTS,
                    loading: false,
                    products:res.data.data.productCatalog.productDescriptions
                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })

    };
}
export function getFormByServiceId(id) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/admin/dynamicforms/services/${id}`)
            .then(res => {
                // alert(JSON.stringify(res.data.data,null,5))
                dispatch({
                    type: DYNAMIC_FORM,
                    loading: false,
                    showForm: true,
                    form: res.data.data,

                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })

    };
}
export function getPricePlan(labId, classId, productId) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/${labId}/price-classes/${classId}/product-catalog/products/${productId}/prices`)
            .then(res => {
                // alert(JSON.stringify(res, null, 5))
                var keys = [];
                for (let key in res.data.data) {
                    keys.push({ key: key, value: res.data.data[key] });
                }
                dispatch({
                    type:PRICE_PLAN,
                    loading: false,
                    pricePlan:keys,
                });
            }).catch(err => {
                if(err.response.status==422){
                    dispatch({
                        type:PRICE_PLAN,
                        loading: false,
                        pricePlan:[]
                    });
                }else{
                    dispatch({
                        type:PRICE_PLAN,
                        loading: false,
                        pricePlan:[]
                    });
                }
            })

    };
}
export function hideForm() {
    return (dispatch) => {
        dispatch({
            type: SHOW_FORM,
            loading: false,
            showForm: false,
        });
    };
}

export function getOrderManagement(page,limit,status){
    return (dispatch) => {
        storageService.getItem('decoded').then(info=>{
            httpService.httpGetJwt(`idandoon/clinics/${JSON.parse(info).context.id}/orders-by-line-item-status?page=${page}&limit=${limit}&statusList=${status}`)
            .then(res => {
                console.log(res);
                for(let item of res.data.data){
                    m = moment(item.orderedDate.substring(0.10), 'YYYY/M/D')
                    item.orderedDate = m.format('jYYYY/jM/jD')
                    // if(item.countList){
                        item.all=0
                        item.doneNumber=0
                        for(let sub of item.countList){
                            item.all+=sub.count
                            if(sub.orderLineItemsStatus=='DONE'){
                              item.doneNumber=sub.count
                            }
                          }
                    // }
                }
                dispatch({
                    type:ORDER_MANAGEMENT,
                    loading: false,
                    orders:res.data.data,
                    page:page
                });
            }).catch(err => {
                console.log(err)
            })
        })
        

    };
}

export function getOrderLineItemsById(id){
    // idandoon/clinics/5bc6171f5694d50916fa7c35/get-order-line-items-by-order-id
    return (dispatch)=>{
        httpService.httpGetJwt(`idandoon/clinics/${id}/get-order-line-items-by-order-id`).then(res=>{
            // alert(JSON.stringify(res.data.data))
            let current=[]
            current=res.data.data;
            for(let item of current.orderLineItems){
                item.labels=[];
                item.currentStep=0
                let go=true;
                for(let sub of item.product.workSteps){
                    item.labels.push(sub.title)
                    if(go&&sub.status=='DONE'){
                        item.currentStep=item.currentStep+1;
                    }else{
                        go=false;
                    }
                }
            }
            dispatch({
                type:CURRENT_ORDER,
                loading: false,
                currentOrder:current,
            });
        })
    }
}
export function uploadData(formData,contentType){
    return (dispatch)=>{
        httpService.upload('idandoon/files?type=FILE&category=ORDER',formData,contentType).then(res=>{
            // alert(JSON.stringify(res,null,5))
            dispatch({
                type:UPLOAD,
                loading: false,
                file:res.data.data,
            });
        }).catch(err=>{
            alert(JSON.stringify(err))
        })
    }
}

export function addOrderLineItem(line){

    return (dispatch)=>{
        dispatch({
            type:ORDER_LINE_ITEM,
            loading: false,
            line:line,
        });
    }
}
export function resetPricePlan(line){
    return (dispatch)=>{
        dispatch({
            type:RESET_PRICE_PLAN,
            loading: false,
            line:line,
        });
    }
}
export function addOrderLineItemAndOrder(patient,description,labId,labName){
    return (dispatch)=>{
        dispatch({
            type:GO_TO_PREVIEW,
            loading: false,
            patient:patient,
            description:description,
            labId:labId,
            labName:labName
        });
    }
}
// export function addOrderLineItemAndOrder(line,patient,description,labId,labName){
//     return (dispatch)=>{
//         dispatch({
//             type:GO_TO_PREVIEW,
//             loading: false,
//             patient:patient,
//             description:description,
//             labId:labId,
//             labName:labName,
//             line:line,
//         });
//     }
// }

export function showLoading(){
    return (dispatch) => {
        dispatch({
            type:LOADING,
            loading: true,
        });
    }
}
export function setForm(form){
    return (dispatch) => {
        dispatch({
            type:SET_FORM,
            form:form,
            loading:false
        });
    }
}

export function createOrder(labId,order,address){
    return (dispatch) => {
        order.address=address
        order.comment=order.description
        storageService.getItem('decoded').then(info=>{
            httpService.httpPostJwt(`idandoon/laboratories/${labId}/clinics/${JSON.parse(info).context.id}/orders`,order)
            .then(res => {   
                Snackbar.show({
                    title: 'سفارش شما با موفقیت ارسال شد',
                    duration: 3000,
                  });
                dispatch({
                    type:CREATE_ORDER,
                    loading: false,
                });
            }).catch(err => {
                console.log(err)
            })
        })
        

    };
}

// idandoon/clinics/get-address/5c0764b45694d55817b3e330
export function getAddress() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info=>{
            httpService.httpGetJwt(`idandoon/clinics/get-address/${JSON.parse(info).context.id}`)
            .then(res => {
                dispatch({
                    type: GET_ADDRESS,
                    loading: false,
                    address: res.data.data
                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })
        })
        

    };
}

export function getOrderLineItems(page,limit){
    return (dispatch)=>{
        httpService.httpGetJwt(`idandoon/clinics/orders-line-item-list?page=${page}&size=${limit}`).then(res=>{
            // alert(JSON.stringify(res,null,5))
            for(let item of res.data.data.content){
                m = moment(item.orderedDate.substring(0.10), 'YYYY/M/D')
                item.orderedDate = m.format('jYYYY/jM/jD')
            }
            dispatch({
                type:ORDERLINEITEMS_DOCTOR,
                loading: false,
                lineItemsDoctor:res.data.data.content,
            });
        }).catch(err=>{
            alert(JSON.stringify(err))
        })
    }
}

export function orderLineItemStatus(labId,orderId,orderLineItemId,object){
    return (dispatch)=>{
        storageService.getItem('decoded').then(info=>{
            httpService.httpPutJwt(`idandoon/laboratories/${labId}/clinics/${JSON.parse(info).context.id}/orders/${orderId}/orderLineItems/${orderLineItemId}/checking`,object)
            .then(res => {
                dispatch({
                    type: CHANGE_STATUS,
                    loading: false,
                    address: res.data.data
                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })
        })
    }
}
// تایید
// idandoon/laboratories/5c0765bd5694d55817b3e332/clinics/5c0764b45694d55817b3e330/orders/5c0a5e605694d519dabf7591/orderLineItems/03d0ab0a-a830-4f37-a72f-f657fb5685b0/checking

// ارجاع
// /idandoon/laboratories/5c0765bd5694d55817b3e332/clinics/5c0764b45694d55817b3e330/orders/5c0a8a955694d51a5271777c/orderLineItems/74123b4e-afb8-4738-84b6-6d93bde78f22/checking
// checkComment: {text: "asadsdsasd"}
// text: "asadsdsasd"
// checkingType: "REVISION"


// checkComment: {}
// checkingType: "REJECTED"
// comment: "سشیشسی"


// checkingType: "ACCEPTED"
// rate: 5