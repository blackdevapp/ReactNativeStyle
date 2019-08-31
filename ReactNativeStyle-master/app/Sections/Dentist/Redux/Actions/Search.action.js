export const SEARCH_LAB = 'SEARCH_LAB';
export const GET_LAB = 'GET_LAB';
export const HIDE_PROFILE = 'HIDE_PROFILE';
export const PRICE_PLAN = 'PRICE_PLAN';
export const PRICE_LIST = 'PRICE_LIST';
export const LOADING = 'LOADING';

export const ADD_TO_COMPARE_LIST = 'ADD_TO_COMPARE_LIST';
export const DELETE_FROM_COMPARE_LIST = 'DELETE_FROM_COMPARE_LIST';
export const CLEAN_COMPARE_LIST = 'CLEAN_COMPARE_LIST';
export const GET_COMPARE_LIST = 'GET_COMPARE_LIST';

import httpService from '../../../../Services/Http.service'
import storageService from '../../../../Services/Storage.service'
import Snackbar from 'react-native-snackbar';

export function getAllLabsSearch(query) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/search?${query}`)
            .then(res => {
                dispatch({
                    type: SEARCH_LAB,
                    loading: false,
                    labs: res.data.data.content
                });
            }).catch(err => {
                if(err.response.status==422){
                    Snackbar.show({
                        title: 'هیچ لابراتوری یافت نشد',
                        duration: 3000,
                      });
                    dispatch({
                        type: SEARCH_LAB,
                        loading: false,
                        labs: []
                    });
                }
                // alert(JSON.stringify(err, null, 4))
            })

    };
}

export function getLabProfile(id) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/${id}`)
            .then(res => {
                // alert(JSON.stringify(res, null, 4))

                dispatch({
                    type: GET_LAB,
                    loading: false,
                    profileLab: res.data.data,
                    showProfile: true
                });
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })

    };
}
// idandoon/laboratories/5be30d835694d53bfa4b9e23/subscribers
export function requestPricePlan(id){
    return (dispatch) => {
        httpService.httpPostJwt(`idandoon/laboratories/${id}/subscribers`,{}).then(res=>{
            dispatch({
                type: PRICE_PLAN,
                loading:false
            });
        })
        
    };
}
export function hideProfile() {
    return (dispatch) => {
        dispatch({
            type: HIDE_PROFILE,
            showProfile: false
        });
    };
}
export function getPriceList(labId,classId) {
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/${labId}/price-classes/${classId}`).then(res=>{
            // alert(JSON.stringify(res));
            dispatch({
                type: PRICE_LIST,
                loading:false,
                priceList:res.data.data
            });
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



export function addToCompareList(newLabToCompare) {


    return (dispatch) => {
        dispatch({
            type: ADD_TO_COMPARE_LIST,
            newLabToCompare: newLabToCompare
        });
    }
}

export function deleteFromCompareList(id) {


    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_COMPARE_LIST,
            id: id
        });
    }
}
export function cleanCompareList(id) {

    return (dispatch) => {
        dispatch({
            type: CLEAN_COMPARE_LIST
        });
    }
}

export function getCompareList(query) {

    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/compare-list?${query}`).then(res=>{
            // alert(JSON.stringify(res));
            console.log(res);
            dispatch({
                type: GET_COMPARE_LIST,
                loading:false,
                compareLabList:res.data.data
            });
        }).catch(err=>{
            console.log(err);
        })
        
    };
}

export function searchByName(term){
    return (dispatch) => {
        httpService.httpGetJwt(`idandoon/laboratories/search-by-name?term=${term}`)
            .then(res => {
                if(res.data.data==[]){
                    Snackbar.show({
                        title: 'هیچ لابراتوری یافت نشد',
                        duration: 3000,
                      });
                }else{
                    dispatch({
                        type: SEARCH_LAB,
                        loading: false,
                        labs: res.data.data
                    });
                }
               
            }).catch(err => {
                if(err.response.status==422){
                    Snackbar.show({
                        title: 'هیچ لابراتوری یافت نشد',
                        duration: 3000,
                      });
                    dispatch({
                        type: SEARCH_LAB,
                        loading: false,
                        labs: []
                    });
                }
                // alert(JSON.stringify(err, null, 4))
            })

    };
}