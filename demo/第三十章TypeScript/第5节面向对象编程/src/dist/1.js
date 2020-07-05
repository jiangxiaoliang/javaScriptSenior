var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    // id: number
    // username: string
    // constructor(id: number, username: string) {
    //     this.id = id
    //     this.username = username
    // }
    function User(id, username) {
        this.id = id;
        this.username = username;
    }
    User.prototype.postArticle = function (title, content) {
        console.log(this.username + "\u53D1\u8868\u7684\u4E86\u4E00\u7BC7\u6587\u7AE0:" + title);
    };
    return User;
}());
var Vip = /** @class */ (function (_super) {
    __extends(Vip, _super);
    function Vip(id, username, score) {
        if (score === void 0) { score = 0; }
        var _this = _super.call(this, id, username) || this;
        _this.score = score;
        return _this;
    }
    Vip.prototype.postArticle = function (title, content, file) {
        _super.prototype.postArticle.call(this, title, content);
        if (file) {
            this.postAttachment(file);
        }
    };
    Vip.prototype.postAttachment = function (file) {
        console.log(this.username + "\u4E0A\u4F20\u4E86\u4E00\u4E2A\u9644\u4EF6\uFF1A" + file);
    };
    return Vip;
}(User));
// let user1 = new User(1, 'jxl')
// let user2 = new User(2, 'zsy')
// user1.postArticle('vue', 'vuevue')
var vip1 = new Vip(1, 'jxl');
vip1.postArticle('vue', 'vuevue');
vip1.postArticle('react', 'reactreact', '1.png');
// vip1.postAttachment('1.png')
