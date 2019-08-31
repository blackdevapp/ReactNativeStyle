const validationService = {

    validateUsername(username) {
        var pattern = new RegExp('/^\d+$/');

        if (username.length != 11) {
            return false
        }
        if (!pattern.test(username)) {
            return false
        } else {
            return true
        }
    },
    validatePassword(password) {
        var pattern = new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/');
        if (!pattern.test(password)) {
            return false
        } else {
            return true
        }

    }


}

export default validationService;