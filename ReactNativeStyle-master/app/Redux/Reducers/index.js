import { combineReducers } from 'redux';
import { GlobalReducer } from './Global.Reducer'
import { UserReducer } from './User.Reducer'
import { OrderReducer } from '../../Sections/Dentist/Redux/Reducers/Order.Reducer'
import { SearchReducer } from '../../Sections/Dentist/Redux/Reducers/Search.Reducer'
import { CompareReducer } from '../../Sections/Dentist/Redux/Reducers/Compare.Reducer'
import { BillReducer } from '../../Sections/Dentist/Redux/Reducers/Bill.Reducer'
import { DashboardReducer } from '../../Sections/Dentist/Redux/Reducers/Dashboard.Reducer'
import { LabReducer } from '../../Sections/Lab/Redux/Reducer/Lab.reducer'
import { TechReducer } from '../../Sections/Tech/Redux/Reducer/Tech.reducer'


// Combine all the reducers
const rootReducer = combineReducers({
    GlobalReducer,
    OrderReducer,
    UserReducer,
    SearchReducer,
    BillReducer,
    DashboardReducer,
    LabReducer,
    TechReducer,
    CompareReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;