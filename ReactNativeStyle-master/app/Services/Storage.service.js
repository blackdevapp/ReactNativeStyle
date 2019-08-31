import { AsyncStorage } from 'react-native';

const storageService = {

    async saveItem(key, item) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
            alert(JSON.stringify(error, null, 4));
        }
    },

    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error);
        }
    },

    async clearItem(key) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error);
        }
    },
    async clearAll() {
        try{
            return await AsyncStorage.clear();
        }catch (error) {
            console.log('AsyncStorage Error: ' + error);
        }
    }

};

export default storageService;