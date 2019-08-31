import { BILLS,LOADING} from "../Actions/Bill.action" 

let BillDataState = {
    loading: false,
    bills:[{
        totalCost:'',
        laboratory:{
            user:{
                profilePic:{}
            }
        }
    }],
    showBill:false,
    billDetails:{
        contact:{},
        address:{},
        
    }

};


export const BillReducer = (state = BillDataState, action) => {
    switch (action.type) {
        case BILLS:
            state = Object.assign({}, state, {
                loading: action.loading,
                bills:action.bills
            });
            return state;
        case LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        default:
            return state;
    }
}