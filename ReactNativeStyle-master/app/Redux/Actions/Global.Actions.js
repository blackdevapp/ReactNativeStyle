export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const SET_ITEM = 'SET_ITEM';
import{
    drawer_about_dentrace,
    drawer_assistant,
    drawer_exit,
    drawer_home,
    drawer_instagram,
    drawer_my_lab,
    drawer_profile,
    drawer_setting,
    drawer_website
    }from '../../assets/img/svg/SvgXml'
const dentistItems = [
    {
        title: 'صفحه اصلی',
        icon: drawer_home,
        link: 'dentist'
    },
    {
        title: 'پروفایل',
        icon: drawer_profile,
        link: 'profile'
    },
    {
        title: 'دستیار های من',
        icon: drawer_assistant,
        link: 'myAssociate'
    },
    {
        title: 'لابراتور های من',
        icon: drawer_my_lab,
        link: 'myLab'
    },
    {
        title: 'تنظیمات',
        icon: drawer_setting,
        link: 'setting1'
    },
    {
        title: 'درباره دنتریس',
        icon: drawer_about_dentrace,
        link: 'about'
    },
    {
        title: 'خروج',
        icon: drawer_exit,
        link: 'logout'
    }
]
const labItems = [
    {
        title: 'صفحه اصلی',
        icon: drawer_home,
        link: 'lab'
    },
    {
        title: 'پروفایل',
        icon: drawer_profile,
        link: 'labProfile'
    },
    {
        title: 'تکنسین های من',
        icon: drawer_assistant,
        link: 'myAssistant'
    },
    {
        title: 'پزشکان همکار',
        icon: drawer_my_lab,
        link: 'myCoWorker'
    },
    {
        title: 'کیف پول من',
        icon: drawer_my_lab,
        link: 'accountingLab'
    },
    {
        title: 'دعوت به دنتریس',
        icon: drawer_my_lab,
        link: 'invite'
    },
    {
        title: 'تنظیمات',
        icon: drawer_my_lab,
        link: 'setting'
    },
    {
        title: 'درباره دنتریس',
        icon: drawer_my_lab,
        link: 'about'
    },
    {
        title: 'خروج',
        icon: drawer_exit,
        link: 'logout'
    }
]
const techItems = [
    {
        title: 'صفحه اصلی',
        icon: drawer_home,
        link: 'tech'
    },
    {
        title: 'پروفایل',
        icon: drawer_profile,
        link: 'profileTech'
    },
    {
        title: 'تنظیمات',
        icon: drawer_my_lab,
        link: 'setting'
    },
    {
        title: 'درباره دنتریس',
        icon: drawer_my_lab,
        link: 'about'
    },
    {
        title: 'خروج',
        icon: drawer_exit,
        link: 'logout'
    }
]

export function drawerOpener() {
    return (dispatch) => {
        dispatch({
            type: DRAWER_OPEN,
            drawerOpen: true,
        });
    }
}

export function drawerCloser() {
    return (dispatch) => {
        dispatch({
            type: DRAWER_OPEN,
            drawerOpen: false,
        });
    }
}
export function setDrawerItems(type){
    if(type=='dentist'){
        return (dispatch) => {
            dispatch({
                type: SET_ITEM,
                items: dentistItems,
            });
        }
    }else if(type=='lab'){
        return (dispatch) => {
            dispatch({
                type: SET_ITEM,
                items: labItems,
            });
        }
    }else if(type=='tech'){
        return (dispatch) => {
            dispatch({
                type: SET_ITEM,
                items: techItems,
            });
        }
    }
    
}


