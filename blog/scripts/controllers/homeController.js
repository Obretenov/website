/**
 * Created by Ivan on 9/1/2016.
 */
class HomeController {
    constructor(homeView, requester, baseUrl, appKey) {
        this._homeView = homeView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts1";
    }
    showGuestPage () {
        let _that = this;
        let recentPosts = [];
        this.requester.get(_that._baseServiceUrl, function success(data) {
            showPopup('success', 'Success');

                let currentId = 1;
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for (let i = 0; i < 8 && i < data.length; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }
                _that._homeView.showGuestPage(recentPosts, data);
            },
            function error (data) {
                showPopup('error', 'Error');
            }
        )

    }
    showUserPage () {
        let _that = this;
        let recentPosts = [];
        this.requester.get(_that._baseServiceUrl, function success(data) {
                showPopup('success', 'Success');
                let currentId = 1;
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });
                for (let i = 0; i < 5; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }
                _that._homeView.showUserPage(recentPosts, data);
            },
            function error (data) {
                showPopup('error', 'Error');
            }
        )
    }
}
