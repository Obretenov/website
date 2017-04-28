/**
 * Created by Ivan on 9/1/2016.
 */
class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + '/appdata/' + appKey + '/posts1';
    }
    showCreatePostPage(fullName, isLoggedIn) {
        this._postView.showCreatePostPage(fullName, isLoggedIn);
    }
    createNewPost(data){
        this._requester.post(this._baseServiceUrl, data, function (responseData) {
                showPopup('success', 'Post has been created!');
                redirectUrl('#/')
            }, function (responseData) {
                showPopup('error', 'Error');
            }
        )
    }
}
