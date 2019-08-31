export const BILLS = 'BILLS';
export const GET_LAB = 'GET_LAB';
export const HIDE_PROFILE = 'HIDE_PROFILE';
var moment = require('moment-jalaali')
export const LOADING = 'LOADING';

import httpService from '../../../../Services/Http.service'
import storageService from '../../../../Services/Storage.service'

export function getAllBill(query) {
    return (dispatch) => {
        storageService.getItem('decoded').then(info=>{
            httpService.httpGetJwt(`idandoon/clinics/${JSON.parse(info).context.id}/bills?${query}`).then(res => {

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
                // console.log(res.data.data.content)
                dispatch({
                    type: BILLS,
                    loading: false,
                    bills: res.data.data.content
                });
                // alert(JSON.stringify(res,null,4))
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })
        })
        

    };
}
export function showLoading(){
    return (dispatch) => {
        dispatch({
            type:LOADING,
            loading: true,
        });
    }
}