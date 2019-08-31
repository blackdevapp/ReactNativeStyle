import {
    SEARCH_LAB,
    GET_LAB,
    HIDE_PROFILE,
    PRICE_PLAN,
    PRICE_LIST,
    LOADING,
    ADD_TO_COMPARE_LIST,
    DELETE_FROM_COMPARE_LIST,
    CLEAN_COMPARE_LIST,
    GET_COMPARE_LIST
} from "../Actions/Search.action"


let SearchDataState = {
    loading: false,
    labs: [{
        user: {
            firstname: '',
            lastname: ''
        }
    }],
    showProfile: false,
    profileLab: {
        contact: {},
        address: {},
        specializations: [],
        user: {
            profilePic: {}
        }

    },
    priceList: {
        id: '',
        title: '',
        productCatalog: {
            productDescriptions: [{
                pricePlanMap: {},
                productName: ''
            }],
            productPricePlanTitles: []
        }
    }
    ,
    compareList: [],
    compareLabList: [],
    
};


export const SearchReducer = (state = SearchDataState, action) => {
    switch (action.type) {
        case SEARCH_LAB:
            state = Object.assign({}, state, {
                loading: action.loading,
                labs: action.labs
            });
            return state;

        case GET_LAB:
            state = Object.assign({}, state, {
                loading: action.loading,
                profileLab: action.profileLab,
                showProfile: action.showProfile
            });
            return state;
        case GET_COMPARE_LIST:
            state = Object.assign({}, state, {
                loading: action.loading,
                compareLabList: action.compareLabList
            });
            return state;
        case HIDE_PROFILE:
            state = Object.assign({}, state, {
                loading: action.loading,
                showProfile: action.showProfile
            });
            return state;

        case PRICE_PLAN:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;

        case PRICE_LIST:
            state = Object.assign({}, state, {
                loading: action.loading,
                priceList: action.priceList
            });
            return state;
        case LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case ADD_TO_COMPARE_LIST:
            let slice = new Array(action.newLabToCompare)
            if (state.compareList.length <= 2) {
                for(let item of state.compareList){
                    if(item.labId==action.newLabToCompare.labId){
                        return ({
                            ...state,
                            loading: action.loading
                        })
                    }
                }
                return ({
                    ...state,
                    loading: action.loading,
                    compareList: slice.concat(state.compareList)
                })

            } else {
                return ({
                    ...state,
                    loading: action.loading
                })
            }

        case DELETE_FROM_COMPARE_LIST:

            let id = action.id;
            let newArray= state.compareList.filter(function (item) {
                return item.labId != id
            })

            return ({
                ...state,
                compareList:newArray,
                loading: action.loading
            })
        case CLEAN_COMPARE_LIST:
            return ({
                ...state,
                compareList:[],
                loading: action.loading
            })

        default:
            return state;
    }
}