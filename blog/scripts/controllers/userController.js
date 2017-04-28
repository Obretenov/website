/**
 * Created by Ivan on 9/1/2016.
 */
class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";

    }
    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);
    }
    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);
    }
    login(data){
        let requestUrl = this._baseServiceUrl + "login";
        this._requester.post(requestUrl, data,
            function successCallback(response) {
                sessionStorage.setItem('username',response.username);
                sessionStorage.setItem('_authToken',response._kmd.authtoken);
                sessionStorage.setItem('fullName',response.fullname);

                showPopup('success', 'Login Successful!');
                redirectUrl('#/');
            },
            function errorCallback(response) {
                showPopup('error', 'Login Failed!');
            });
    }
    register(data){
        if(data.username.length < 5) {
            showPopup('error', 'Username must be longer!');
            return;
        }
        if(data.fullname.length < 5) {
            showPopup('error', 'Fullname must be longer!');
            return;
        }
        if(data.password != data.confirmPassword) {
            showPopup('error', 'Password doeas not match!');
            return;
        }
        if(data.password.length < 7) {
            showPopup('error', 'Password must be longer!');
            return;
        }
        delete data['confirmPassword'];
        this._requester.post(this._baseServiceUrl, data,
            function successCallback(response) {
                showPopup('success', 'Registration Successful!');
                redirectUrl('#/login');
            },
            function errorCallback(response) {
                showPopup('error', 'Registration Failed!');
            });
    }
    logout() {
        sessionStorage.clear();
        redirectUrl('#/');
    }
}
