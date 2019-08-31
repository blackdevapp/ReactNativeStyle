import {
    CONNECTED_LABS, PRODUCTS, DYNAMIC_FORM, CURRENT_ORDER, SHOW_FORM, PRICE_PLAN, ORDER_MANAGEMENT,CHANGE_STATUS,
    UPLOAD, ORDER_LINE_ITEM, RESET_PRICE_PLAN, GO_TO_PREVIEW, LOADING, SET_FORM, CREATE_ORDER,GET_ADDRESS,ORDERLINEITEMS_DOCTOR
} from "../Actions/Order.action"

let OrderDataState = {
    loading: false,
    connectedLabs: [],
    products: [],
    showForm: false,
    pricePlan: [],
    file: [],
    address:[],
    orders:[{
        patientInfo:{},
        laboratoryForClient:{
            user:{
                profilePic:{
                }
            }
        }
      }],
    form: {
        id: '',
        title: '',
        properties: [
            { id: '', key: '', propertyType: '', repository: [], data: [] }
        ]
    },
    lineItemsDoctor:[],
    order: {
        comment:'',
        labName: '',
        description: '',
        laboratoryId: '',
        patientInfo: {
            fullName: ''
        },
        address:{},
        attachedFiles: [],
        orderLineItems: [],
    },


};


export const OrderReducer = (state = OrderDataState, action) => {
    switch (action.type) {
        case CONNECTED_LABS:
            state = Object.assign({}, state, {
                loading: action.loading,
                connectedLabs: action.connectedLabs
            });
            return state;
        case PRODUCTS:
            state = Object.assign({}, state, {
                loading: action.loading,
                products: action.products
            });
            return state;
        case DYNAMIC_FORM:
            state = Object.assign({}, state, {
                loading: action.loading,
                showForm: action.showForm,
                form: action.form
            });
            return state;
        case SHOW_FORM:
            state = Object.assign({}, state, {
                loading: action.loading,
                showForm: action.showForm,
            });
            return state;
        case PRICE_PLAN:
            state = Object.assign({}, state, {
                loading: action.loading,
                pricePlan: action.pricePlan,
            });
            return state;
        case ORDER_MANAGEMENT:
            if(action.page>0){
                state = Object.assign({}, state, {
                    loading: action.loading,
                    orders: state.orders.concat(action.orders),
                });
                return state;
            }else{
                state = Object.assign({}, state, {
                    loading: action.loading,
                    orders: action.orders,
                });
                return state;
            }
            
            
        case CURRENT_ORDER:
            state = Object.assign({}, state, {
                loading: action.loading,
                currentOrder: action.currentOrder,
            });
            return state;
        case UPLOAD:
            state = Object.assign({}, state, {
                loading: action.loading,
                file: state.file.concat(action.file),
            });
            return state;
        case ORDER_LINE_ITEM:
            state = Object.assign({}, state, {
                loading: action.loading,
                order: {
                    orderLineItems: state.order.orderLineItems.concat(action.line)
                },
                form: {},
                pricePlan: []
            });
            return state;
        case RESET_PRICE_PLAN:
            state = Object.assign({}, state, {
                pricePlan: []
            });
            return state;
        case GET_ADDRESS:
            state = Object.assign({}, state, {
                address:action.address
            });
            return state;
        case ORDERLINEITEMS_DOCTOR:
            state = Object.assign({}, state, {
                lineItemsDoctor:action.lineItemsDoctor
            });
            return state;
        case GO_TO_PREVIEW:
            state = Object.assign({}, state, {
                order: {
                    labName: action.labName,
                    patientInfo: {
                        fullName: action.patient
                    },
                    description: action.description,
                    laboratoryId: action.labId,
                    orderLineItems: state.order.orderLineItems,
                    attachedFiles: state.file,
                },
                form: {},
                pricePlan: []
                // products: []
            });
            return state;
        case LOADING:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case CHANGE_STATUS:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case SET_FORM:
            state = Object.assign({}, state, {
                loading: action.loading,
                form: action.form
            });
            return state;
        case CREATE_ORDER:
            state = Object.assign({}, state, {
                loading: action.loading,
                file: [],
                form: undefined,
                order: {
                    labName: '',
                    description: '',
                    laboratoryId: '',
                    patientInfo: {
                        fullName: ''
                    },
                    attachedFiles: [],
                    orderLineItems: [],
                },
            });
            return state;
        default:
            return state;
    }
}