/**
 * Router
 * @return {[type]} [description]
 */
define('router_pc', ['js/shop_pc/view/layout'], function(LayoutView) {
    var Router = Backbone.Router.extend({
        routes: {
            //首页
            "testPay": "testPay", //test pay
            "": "index",
            "index": "index",
            "orderList": "orderList", // 收银
            "vipbox": "vipbox", //会员
            "inforbox": "inforbox", //会员信息c
            "infDetail": "infDetail", //详情
            "qrCodePay": "qrCodePay", //二维码支付页

            "orderPay": "orderPay", //收银
            "orderContinue": "orderContinue",
            "orderContinueError": "orderContinueError",
            "productManager": "productManager",
            'productPfManager': 'productPfManager', //批发商品管理
            "orderManager": "orderManager",
            "memberList": "memberList",  //客户管理                                                                                                                                                                                                                                                                                                                                                        
            "forgetPwd": "forgetPwd",
            "accountIndex": "accountIndex", //我的账户首页
            "accountEditInfo": "accountEditInfo", //我的账户修改个人信息页
            "accountBindBank": "accountBindBank", //绑定银行卡界面
            "accountResetPwd": "accountResetPwd", //我的账户修改密码
            "accountNotice": "accountNotice", //我的账户通知公告
            "accountMatter": "accountMatter", //我的账户通知公告
            "accountNoticeDetail/:id": 'accountNoticeDetail', //通知公告详情
            "orderRecord": 'orderRecord', //交易记录
            'news': 'news', //通知公告
            "login": 'login', //登录页
            'accountEmployee': 'accountEmployee', //我的账户员工管理界面
            'accountShop': 'accountShop', //分店管理
            'accountAuth': 'accountAuth', //授权申请
            'accountWithdraw': 'accountWithdraw', //取现
            'userOrderPrint/:id': 'userOrderPrint', //打印订单收据

            'recharge': 'recharge', //充值
            "qrCodePayRecharge": "qrCodePayRecharge", //二维码支付页

            'productDetail/:id': 'productDetail', //产品详情

        },

        //初始化布局
        initialize: function() {
            // this._init();
        },
        pageStack: {},
        removeView: function() {
            var t = this;
            // if (!!t.pageStack) {
            //     for (var item in t.pageStack) {
            //         t.pageStack[item].remove();
            //         // t.pageStack[item].stopListening();
            //     }
            // }
        },
        //覆盖router的arguments方法这样可以获取跳转时的传值
        navigate: function() {
            this.info = arguments[1];
            Backbone.Router.prototype.navigate.apply(this, arguments);
        },
        //index
        index: function() {
            var t = this;
            t.removeView();
            // t._init();
            // $('#pg_box') && $('#pg_box').remove();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/index"], function(IndexView) {
                //list oi
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['index'] = indexView;
            });
        },
        memberList: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/memberList"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['memberList'] = indexView;
            });
        },
        //测试支付用的页面
        testPay: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/testPay"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['testPay'] = indexView;
            });
        },
        //订单列表  收银
        orderList: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/orderList"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderList'] = indexView;
            });
        },
        //会员
        vipbox: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/vipbox"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['vipbox'] = indexView;
            });
        },
        //会员信息
        inforbox: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/inforbox"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['inforbox'] = indexView;
            });
        },
        //详情
        infDetail: function() {
            var t = this;
            t.removeView();
            // var container = '<div id="view"></div>';
            // $('.pageContainer').append(container);
            requirejs(["js/shop_pc/view/infDetail"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['infDetail'] = indexView;
            });
        },
        //二维码支付页
        qrCodePay: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/qrCodePay"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['qrCodePay'] = indexView;
            });
        },
        orderPay: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/orderPay"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderPay'] = indexView;
            });
        },
        orderContinue: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/orderContinue"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderContinue'] = indexView;
            });
        },
        orderContinueError: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/orderContinueError"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderContinueError'] = indexView;
            });
        },
        productManager: function() {
            var t = this;
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/productManager"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['productManager'] = indexView;
            });
        },
        orderManager: function() {
            var t = this;
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/orderManager"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderManager'] = indexView;
            });
        },
        forgetPwd: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/forgetPwd"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['forgetPwd'] = indexView;
            });
        },
        accountIndex: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountIndex"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountIndex'] = indexView;
            });
        },
        accountEditInfo: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountEditInfo"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountEditInfo'] = indexView;
            });
        },
        accountBindBank: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountBindBank"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountBindBank'] = indexView;
            });
        },
        accountResetPwd: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountResetPwd"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountResetPwd'] = indexView;
            });
        },
        orderRecord: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/orderRecord"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['orderRecord'] = indexView;
            });
        },
        news: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountNotice"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountNotice'] = indexView;
            });
        },
        login: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/login"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['login'] = indexView;
            });
        },
        accountNotice: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountNotice"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountNotice'] = indexView;
            });
        },
        accountNoticeDetail: function(id) {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountNoticeDetail"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t,
                    noticeId: id
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountNoticeDetail'] = indexView;
            });
        },
        accountMatter: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountMatter"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountMatter'] = indexView;
            });
        },
        accountEmployee: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountEmployee"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountEmployee'] = indexView;
            });
        },
        accountShop: function() {
            var t = this;
            // t.removeView();
            requirejs(["js/shop_pc/view/accountShop"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                // t.pageStack['accountFork'] = indexView;
            });
        },
        accountAuth: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountAuth"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountAuth'] = indexView;
            });
        },
        accountWithdraw: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/accountWithdraw"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['accountWithdraw'] = indexView;
            });
        },
        userOrderPrint: function(id) {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/userOrderPrint"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, {
                    orderId: id
                }, {}, null, false);
                t.pageStack['userOrderPrint'] = indexView;
            });
        },
        productPfManager: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/productPfManager"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['productPfManager'] = indexView;
            });
        },
        recharge: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/recharge"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['recharge'] = indexView;
            });
        },
        qrCodePayRecharge: function() {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/qrCodePayRecharge"], function(IndexView) {
                var container = document.body;
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['qrCodePayRecharge'] = indexView;
            });
        },
        productDetail: function(id) {
            var t = this;
            t.removeView();
            requirejs(["js/shop_pc/view/productDetail"], function(IndexView) {
                var container = document.body;
                t.info = $.extend(t.info, {
                    productId: id
                })
                var indexView = new IndexView({
                    el: container,
                    routes: t
                }, (t.info || {}), {}, null, false);
                t.pageStack['productDetail'] = indexView;
            });
        },



    });
    return Router;
});