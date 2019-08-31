export const CONNECTED_LAB = 'CONNECTED_LAB';
export const TECH_ORDER_BY_LAB_ID = 'TECH_ORDER_BY_LAB_ID';
export const LINE_ITEM_BY_ID = 'LINE_ITEM_BY_ID';
export const START_WORK = 'START_WORK';
export const END_WORK = 'END_WORK';
export const TECH_PROFILE = 'TECH_PROFILE';

import Snackbar from 'react-native-snackbar';

import httpService from '../../../../Services/Http.service'
import storageService from '../../../../Services/Storage.service'
var moment = require('moment-jalaali')



export function showLoading() {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            loading: true,
        });
    }
}

// idandoon/technicians/5bbb03c65694d535834d9bec/connected-labs
export function getConnectedLab() {
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            httpService.httpGetJwt(`idandoon/technicians/${JSON.parse(info).context.id}/connected-labs`).then(res => {
                dispatch({
                    type: CONNECTED_LAB,
                    loading: false,
                    connectedLab: res.data.data
                })
            }).catch(err => {
                if (err.response.status == 422) {
                    dispatch({
                        type: CONNECTED_LAB,
                        loading: false,
                        connectedLab: []
                    })
                } else {
                    alert(JSON.stringify(err.response))
                }
            })
        })
    }
}
// idandoon/laboratoreis/5bba73c65694d50fbe642e63/technician-comming-order/5bbb03c65694d535834d9bec
export function getOrderListByLabId(labId, status) {
    return (dispatch) => {
        if (status == 'done') {
            // idandoon/technicians/5bbb03c65694d535834d9bec/tasks?status=DONE
            storageService.getItem('decoded').then(info => {
                httpService.httpGetJwt(`idandoon/technicians/${JSON.parse(info).context.id}/tasks?status=DONE&labId=${labId}`).then(res => {
                    console.log(res.data.data.content);
                    dispatch({
                        type: TECH_ORDER_BY_LAB_ID,
                        loading: false,
                        techOrdersByLabId: res.data.data.content,
                        status:status
                    })
                }).catch(err => {
                    alert(JSON.stringify(err.response))

                })
            })
        } else {
            storageService.getItem('decoded').then(info => {
                httpService.httpGetJwt(`idandoon/laboratoreis/${labId}/${status}/${JSON.parse(info).context.id}`).then(res => {
                    // console.log(res.data.data)
                    dispatch({
                        type: TECH_ORDER_BY_LAB_ID,
                        loading: false,
                        techOrdersByLabId: res.data.data,
                        status:status
                    })
                }).catch(err => {
                    alert(JSON.stringify(err.response))

                })
            })
        }

    }
}
// idandoon/clinics/5bfbeb1322f9ad21c449fa22/get-order-line-items-by-order-id
export function getItemsByOrderId(id) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/clinics/${id}/get-order-line-items-by-order-id`).then(res => {
            m = moment(res.data.data.orderedDate.substring(0, 10), 'YYYY/M/D')
            res.data.data.orderedDate = m.format('jYYYY/jM/jD') + ' ' + res.data.data.orderedDate.substring(11, 16)
            dispatch({
                type: LINE_ITEM_BY_ID,
                loading: false,
                orderLineItems: res.data.data
            })
        }).catch(err => {
            if (err.response.status == 422) {
                dispatch({
                    type: LINE_ITEM_BY_ID,
                    loading: false,
                    orderLineItems: {}
                })
            } else {
                alert(JSON.stringify(err.response))
            }
        })
    }
}
export function startWorkStep(work){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            work.technicianId=`${JSON.parse(info).context.id}`
            httpService.httpPostJwt(`idandoon/technicians/${JSON.parse(info).context.id}/tasks`,work).then(res => {
                dispatch({
                    type: START_WORK,
                    loading: false
                })
            }).catch(err => {
                
                    alert(JSON.stringify(err.response))
                
            })
        })
    }
}
export function endWorkStep(order_id,item_id,step_id,work){
    return (dispatch) => {
        storageService.getItem('decoded').then(info => {
            work.technicianId=`${JSON.parse(info).context.id}`
            httpService.httpPutJwt(`idandoon/technicians/${JSON.parse(info).context.id}/orders/${order_id}/items/${item_id}/work-steps/${step_id}?status=DONE`,work).then(res => {
                dispatch({
                    type: END_WORK,
                    loading: false
                })
            }).catch(err => {
                
                    alert(JSON.stringify(err.response))
                
            })
        })
    }
}
export function getTechProfile(){
    return (dispatch) => {
            httpService.httpGetJwt(`idandoon/users/get-name-phone`).then(res => {
                dispatch({
                    type: TECH_PROFILE,
                    loading: false,
                    profileTech:res.data
                })
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }
}