import {CONNECTED_LAB,TECH_ORDER_BY_LAB_ID,LINE_ITEM_BY_ID,END_WORK,TECH_PROFILE,
    START_WORK}from '../Actions/Tech.action'
let TechDataState = {
    loading: false,
    connectedLab:[],
    techOrdersByLabId:[],
    status:'',
    profileTech:{
        user:{
            firstname:'',
            lastname:'',
            username:''
        }
    },
    orderLineItems:{
        patientInfo:{
            fullName:''
        },
        address:{
            province:{
                title:''
            },city:{
                title:''
            },
            tell:'',
            region:''
        }
    }
};


export const TechReducer = (state = TechDataState, action) => {
    switch (action.type) {
        case CONNECTED_LAB:
            state = Object.assign({}, state, {
                loading:action.loading,
                connectedLab:action.connectedLab
            });
            return state;
        case TECH_ORDER_BY_LAB_ID:
            state = Object.assign({}, state, {
                loading:action.loading,
                techOrdersByLabId:action.techOrdersByLabId,
                status:action.status
            });
            return state;
        case LINE_ITEM_BY_ID:
            state = Object.assign({}, state, {
                loading:action.loading,
                orderLineItems:action.orderLineItems
            });
            return state;
        case START_WORK:
            state = Object.assign({}, state, {
                loading:action.loading,
            });
            return state;
        case END_WORK:
            state = Object.assign({}, state, {
                loading:action.loading,
            });
            return state;
        case TECH_PROFILE:
            state = Object.assign({}, state, {
                loading:action.loading,
                profileTech:action.profileTech,
            });
            return state;
        default:
            return state;
    }
}