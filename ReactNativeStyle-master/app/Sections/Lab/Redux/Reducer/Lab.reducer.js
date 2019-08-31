import {
    REQUSTED_SUBSCRIBER, SUBSCRIBER, MY_PRICE_CLASS,
    SEND_PRICE_CLASS, DENTAL_SERVICE, MY_PRICE_CLASS_ITEM,
     CLINICS_ORDER, CLINICS_ORDER_LIST,BILL_DOCTOR,BILL_LIST,GET_LAB,
     GET_COWORKERS,GET_TECHS,INVITE,DELETE_TECH,BILL_PAY,CHECK_PHONE_LAB,ADD_EXIST_TECH,EDIT_PROFILE

} from '../Actions/Lab.action'

import Snackbar from 'react-native-snackbar';

let LabDataState = {
    laboratory: {

        user: {

        },
        socialMediaLinks: [],
        subscribers: [],

        address: {},
        contact: {

        },
        specializations: [

        ],
        materials: [],
        equipments: [],

        photoGalleryMetaData: [],
        priceClasses: [],

        accountPrivacySettings: {

        },
        connectedTechnicians: [],
        connectedTechniciansDeleted: [

        ],
        specialOrderOptions: [

        ],
        rate: {
        },
        credit: 0
    },
    phoneState:false,
    techDetail:{
        user:{
            firstname: '',
            id: '',
            lastname: '',
            type: ''
        }
    },
    loading: false,
    subscribers: [],
    requestedSubscribers: [],
    classes: [],
    bills: [],
    myCoWorker: [],
    dentalService: [{
        id: '',
        type: '',
        productDescriptions: [{
            id: '',
            productName: '',
            serviceId: ''
        }]
    }],
    products: [{
        id: '',
        productName: '',
        serviceId: ''
    }],
    priceClasses: [{
        id: '',
        title: ''
    }],
    clinics: [],
    techs: [],
    profile:{
        user:{},
        address:{},
        contact:{},
        addressList:[]
    },
    billPay:[],
    clinicOrderLineItems: [],
    doctorOrders: {
        labName: '',
        laboratoryId: '',
        to: '',
        clinicId: '',
        dentistName: '',
        billItems: [{
            patientInfo: {
                fullName: ''
            },
            orderId: '',
            orderedDate: '',
            orderLineItem: {
                id: '',
                quantity: 0,
                product: {
                    id: '',
                    productName: ''
                },
                chosenPricePlan: {
                    id: '',
                    planType: '',
                    cost: 0
                },
                lineItemStatus: '',
                teethNumbers: [],
                paymentStatus: '',
                orderedDate: '',
                returned: false
            }
        }],
        billGenerationDate: '',
        status: '',
        discount: '',
        totalCost: '',
        totalCostWithDiscount: '',

    }
};

export const LabReducer = (state = LabDataState, action) => {
    switch (action.type) {
        case REQUSTED_SUBSCRIBER:
            state = Object.assign({}, state, {
                loading: action.loading,
                requestedSubscribers: action.requestedSubscribers
            });
            return state;
        case SUBSCRIBER:
            state = Object.assign({}, state, {
                loading: action.loading,
                subscribers: action.subscribers
            });
            return state;
        case MY_PRICE_CLASS:
            state = Object.assign({}, state, {
                loading: action.loading,
                priceClasses: action.priceClasses
            });
            return state;
        case SEND_PRICE_CLASS:
            state = Object.assign({}, state, {
                loading: action.loading,
            });
            return state;
        case DENTAL_SERVICE:
            state = Object.assign({}, state, {
                loading: action.loading,
                dentalService: action.dentalService,
                products: action.products,
            });
            return state;
        case CLINICS_ORDER:
            state = Object.assign({}, state, {
                loading: action.loading,
                clinics: action.clinics
            });
            return state;
        case BILL_DOCTOR:
            state = Object.assign({}, state, {
                loading: action.loading,
                doctorOrders: action.doctorOrders
            });
            return state;
        case BILL_LIST:
            state = Object.assign({}, state, {
                loading: action.loading,
                bills: action.bills
            });
            return state;
        case CLINICS_ORDER_LIST:
            let orderLineItems = []
            for (let item of action.clinicOrders) {
                for (let sub of item.orderLineItems) {
                    let line = {
                        patient: '',
                        time: '',
                        orderNo: '',
                        orderLineItem: {}
                    }
                    sub.labels = [];
                    sub.currentStep = 0
                    let go = true;
                    for (let sub1 of sub.product.workSteps) {
                        sub.labels.push(sub1.title)
                        if (go && sub1.status == 'DONE') {
                            sub.currentStep = sub.currentStep + 1;
                        } else {
                            go = false;
                        }
                    }
                    line.patient = item.patientInfo.fullName
                    line.time = item.orderedDate
                    line.orderNo = item.orderNO
                    line.orderLineItem = sub
                    orderLineItems.push(line)
                }
            }


            state = Object.assign({}, state, {
                loading: action.loading,
                clinicOrderLineItems: orderLineItems
            });
            return state;
        case MY_PRICE_CLASS_ITEM:
            let classes = []
            for (let item of action.classes) {
                for (let sub of item.productCatalog.productPricePlanTitles) {
                    let classItem = {
                        title: '',
                        type: '',
                        productDescriptions: []
                    }
                    classItem.title = item.title;
                    classItem.type = sub;
                    classItem.productDescriptions = item.productCatalog.productDescriptions
                    classes.push(classItem)
                }
            }
            state = Object.assign({}, state, {
                loading: action.loading,
                classes: classes,
                priceClasses: action.priceClasses
            });
            return state;
        case GET_LAB:

            state = Object.assign({}, state, {
                laboratory: action.laboratory,
                loading:action.loading,
                province:action.province
            });
            return state;
        case GET_COWORKERS:
            state = Object.assign({}, state, {
                myCoWorker: action.myCoWorker
            });
            return state;
        case GET_TECHS:
            state = Object.assign({}, state, {
                techs: action.techs
            });
            return state;
        case INVITE:
            state = Object.assign({}, state, {
                loading: action.loading
            });
            return state;
        case CHECK_PHONE_LAB:
            if(action.phoneState=='ALREADY_EXIST_TECHNICIAN'){
                Snackbar.show({
                    title: 'این کاربر جزو تکنسین های شما می باشد',
                    duration: 7000,
                  });
                  state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState:false
                });
                return state;
            }else if(action.phoneState=='NOT_VALID_TECHNICIAN'){
                Snackbar.show({
                    title: 'این کاربر نقش دیگری در سیستم دارد بنابراین نمی تواند جزو تکنسین های شما باشد',
                    duration: 7000,
                  });
                  state = Object.assign({}, state, {
                    loading: action.loading,
                    phoneState:false
                });
                return state;
            }else if(action.phoneState=='CAN_REGISTER_TECHNICIAN'){
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست تکنسین های خود اضافه کنید',
                    duration: 7000,
                  });
                  
                    state = Object.assign({}, state, {
                        loading: action.loading,
                        phoneState:true,
                        techDetail:{
                            user:{
                                firstname: '',
                                id: '',
                                lastname: '',
                                type: ''
                            }
                        }
                    });
                    return state;
                  
            }else if(action.phoneState=='CAN_RESTORE_TECHNICIAN'){
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست تکنسین های خود اضافه کنید.این تکنسین قبل جزو تکنسین های شما بود',
                    duration: 7000,
                  });
                    state = Object.assign({}, state, {
                        loading: action.loading,
                        phoneState:true,
                        techDetail:action.techDetail
                    });
                    return state;
                  
            }else if(action.phoneState=='CAN_ADD_TECHNICIAN'){
                Snackbar.show({
                    title: 'شما می توانید این کاربر را به لیست تکنسین های خود اضافه کنید.',
                    duration: 7000,
                  });
                    state = Object.assign({}, state, {
                        loading: action.loading,
                        phoneState:true,
                        techDetail:action.techDetail
                    });
                    return state;
                  
            }
            
        case BILL_PAY:
            state = Object.assign({}, state, {
                loading: action.loading,
                billPay:action.billPay
            });
            return state;
        case ADD_EXIST_TECH:
            state = Object.assign({}, state, {
                loading: action.loading,
                techs: action.techs
            });
            return state;
        case DELETE_TECH:
            let i = 0;
            for (let item of state.techs) {
                if (item.id == action.id) {
                    state.techs.splice(i, 1)
                }
                i++;
            }
            state = Object.assign({}, state, {
                loading: action.loading
            });
            return state;
        case EDIT_PROFILE: {
            state = Object.assign({}, state, {
                profile: action.profile
            });
            return state;

        }
        default:
            return state;
    }
}