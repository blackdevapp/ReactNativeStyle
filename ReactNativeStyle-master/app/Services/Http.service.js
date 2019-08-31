import axios from 'axios';

// 5.63.8.178    !AZmoklm@
// 89.32.249.208   As43dGs
// 185.37.55.127:10022  @Ipin@1399@

// export const baseUrl = 'http://192.168.3.173:9090/';
export const baseUrl = 'http://89.32.249.208:8090/';
// export const baseUrl = 'http://5.63.8.178:8090/';
// export const baseUAA = 'http://94.232.173.145:8004/'
import storageService from './Storage.service';


const httpService = {
    async httpPostUAA(url, data) {
        var headers = { 'Content-Type': 'application/json' }
        const res = await axios.post(baseUAA + url, data,{ headers: headers });
        return await res;
    },
    async httpGetUAA(url) {
        const res = await axios.get(baseUAA + url);
        console.log(res);
        return res;
    },
    async httpPost(url, data) {
        const res = await axios.post(baseUrl + url, data);
        return await res.data;
    },
    
    async httpPostJwt(url, data) {
        const token = await storageService.getItem('token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json' ,'Authorization': AuthStr }
        const res= await axios.post(baseUrl + url, data,{ headers: headers });
        return res.data;
    },
    async httpPutJwt(url, data) {
        const token = await storageService.getItem('token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': 'application/json' ,'Authorization': AuthStr }
        const res= await axios.put(baseUrl + url, data,{ headers: headers });
        return res.data;
    },
    async upload(url, data,contentType) {
        const token = await storageService.getItem('token');
        const AuthStr = 'Bearer ' + token;
        var headers = { 'Content-Type': contentType ,'Authorization': AuthStr }
        const res= await axios.post(baseUrl + url, data,{ headers: headers });
        return res;
    },

    async httpGetJwt(url) {
        const token = await storageService.getItem('token');
        const AuthStr = 'Bearer ' + token;
        var headers = {'Content-Type': 'application/json' , 'Authorization': AuthStr }
        const res = await axios.get(baseUrl + url,{ headers: headers });
        // alert(JSON.stringify(res,null,4))
        return await res;
    }

};

export default httpService;