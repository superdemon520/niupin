/**
 *home view
 *订单下单
 **/
define('js/shop_pc/view/productManager', [
        'text!js/shop_pc/template/productManager.tpl',
        'text!js/shop_pc/template/productForm.tpl',
        'js/util/memory_cache',
        'js/components/alert_ui',
        'js/shop_pc/module/header',
        'js/api/product',
        'js/api/community',
        'js/api/order',
        'js/util/string'
    ],
    function(ProductManagerTpl, ProductFormTpl, Cache, AlertUI, Header, ProductApi, CommunityApi, OrderApi, StringUtil) {
        var tipsAlert = tipsAlert || new AlertUI();

        var LayoutView = Backbone.View.extend({
            //
            initialize: function(options, config) {
                var t = this;
                t.$el.off('click');
                $('body').addClass('no_bg');
                $('html').addClass('no_bg');

                t.isManager = '';
                t.isBranchStore = false; //是否是分店

                t.page = 1;
                t.totalPages = 1;
                t.render();
                // Header.initialize();
                new Header({
                    el: t.el,
                    routes: t,
                    goBackUrl: 'index',
                    title: '跨境进口'
                });
            },
            render: function() {
                var t = this;

                t.isNotManager = Cache.isNotManager(); //账号是否是管理员
                t.isBranchStore = Cache.isBranchCommunity(); //是否是分店
                t.isNotShowBranchShopPrice = Cache.isNotShowBranchShopPrice(); //是否是分店并且显示分店成本价

                t.$el.html(tpl(ProductManagerTpl, {
                    isNotManager: t.isNotManager,
                    isNotShowBranchShopPrice: t.isNotShowBranchShopPrice
                }));

                //批发的标志去掉
                Cache.set("type", '');

                var cachePage = Cache.get('page');
                if (cachePage) {
                    t.page = cachePage;
                }
                var cacheTotalPage = Cache.get('totalPages');
                if (cacheTotalPage) {
                    t.totalPages = cacheTotalPage;
                }

                //刷新页面要能记住登录状态
                var pName = Cache.get('productName');
                if (pName) {
                    t.$el.find('.productName').val(pName);
                }



                //填充
                // t.fillInfo();
                t.loadData();

                t.loadCategory();

            },
            events: {
                'click .goCash': 'goCash',
                'click .goIndex': 'goIndex',
                'click .quickOrder': 'quickOrder',
                'click .selectProduct': 'selectProduct',
                'click .icon-check': 'topButton',
                'click .category': 'category',
                'click .goPage': 'goPage',
                'change .priceSales': 'priceSalesKeyUp',
                'change .commission': 'commissionKeyUp',
                'click .prePage': 'prePage',
                'click .nextPage': 'nextPage',
                'click .multiSet': 'multiSet',
                'click .setCommission': 'commissionSet',
                'click .resetPrice': 'resetPrice',
                'click .reSyncProduct': 'reSyncProduct',

                'click .SaveFormButton': 'saveFormButton',
                'click .CloseFormButton': 'closeFormButton',
                'click .reduce': 'reduce',
                'click .add': 'add',
                'click .goDetail': 'goDetail'

            },
            goDetail: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                var productId = current.parent().attr('p-id');
                if (productId) {
                    router.navigate('productDetail/' + productId, {
                        trigger: true,
                        productId: productId
                    });
                }
            },
            reduce: function(e) {
                var t = this;
                var countDom = $(e.currentTarget).next();
                var num = Number(countDom.val());
                if (num > 1) {
                    countDom.val(num - 1);
                }
            },
            add: function(e) {
                var t = this;
                var countDom = $(e.currentTarget).prev();
                var num = Number(countDom.val());

                if (t.formType === 'commission') {
                    if (num < 20) {
                        countDom.val(num + 1);
                    }
                } else {
                    if (num < 200) {
                        countDom.val(num + 1);
                    }
                }
            },
            closeFormButton: function() {
                var t = this;
                t.closeForm();
            },
            saveFormButton: function(e) {
                var t = this;
                var count = t.$el.find('.count').val();

                if (!StringUtil.isNumber(count)) {
                    tipsAlert.openToast({
                        content: '比例请输入数字'
                    });
                    return false;
                }
                if (count < 0 || count > 200) {
                    tipsAlert.openToast({
                        content: '加价比例只能是0%~200%'
                    });
                    return false;
                }
                //t.formType  commission是提成设置，community是门店成本价设置
                var postData = {
                    profitRatio: count,
                    formType: t.formType
                };
                tipsAlert.openLoading({
                    content: '加载中...'
                });
                CommunityApi.updateShopRatioInfo(postData, function(data) {
                    tipsAlert.close();
                    t.closeForm();
                    t.loadData();
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                    }
                });

            },
            showForm: function(data, formType) {
                var t = this;
                t.formType = formType;
                t.$el.find('.form_container').html(tpl(ProductFormTpl, {
                    data: data,
                    formType: formType
                }));
            },
            closeForm: function() {
                var t = this;
                t.$el.find('.form_container').html('');
            },
            //上一页
            prePage: function(e) {
                var t = this;
                if ((t.page - 1) <= 0) {
                    return false;
                }
                t.page = t.page - 1;

                t.loadData();
            },
            //下一页
            nextPage: function(e) {
                var t = this;

                if ((t.page + 1) > t.totalPages) {
                    return false;
                }
                t.page = t.page + 1;

                t.loadData();
            },
            reSyncProduct: function() {
                var t = this;
                tipsAlert.open({
                    cancelText: '取消',
                    confirmText: '确认',
                    content: '是否确定同步？',
                    onConfirm: function(e) {
                        tipsAlert.close();
                        tipsAlert.openLoading({
                            content: '加载中...'
                        });
                        ProductApi.productToCbProduct({}, function(data) {
                            tipsAlert.close();
                            tipsAlert.openAlert({
                                content: '同步成功'
                            });
                            t.loadData();
                        }, function(code, msg) {
                            tipsAlert.close();
                            if (code == -520) {
                                router.navigate('login', {
                                    trigger: true
                                });
                            } else {
                                tipsAlert.openAlert({
                                    content: msg
                                });
                            }
                        });
                    },
                    onCancel: function(e) {
                        tipsAlert.close();
                    }
                });

                // tipsAlert.openAlert({
                //     content: '敬请期待!'
                // });
            },
            multiSet: function() {
                var t = this;

                tipsAlert.openLoading({
                    content: '加载中...'
                });
                CommunityApi.getLoginCommunity({
                    isNotReqeustCaiban: true
                }, function(data) {
                    tipsAlert.close();
                    if (data && data.community) {
                        t.showForm(data.community, 'community');
                    }
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                    }
                });

                // tipsAlert.openAlert({
                //     content: '敬请期待!'
                // });
            },
            //店员提成设置
            commissionSet: function() {
                var t = this;

                tipsAlert.openLoading({
                    content: '加载中...'
                });
                CommunityApi.getLoginCommunity({
                    isNotReqeustCaiban: true
                }, function(data) {
                    tipsAlert.close();
                    if (data && data.community) {
                        t.showForm(data.community, 'commission');
                    }
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                    }
                });

            },
            resetPrice: function() {
                var t = this;
                tipsAlert.open({
                    cancelText: '取消',
                    confirmText: '确认',
                    content: '确定要将零售价重置为系统价格吗？',
                    onConfirm: function(e) {
                        tipsAlert.close();
                        tipsAlert.openLoading({
                            content: '加载中...'
                        });
                        ProductApi.productToCbProduct({
                            syncPrice: true
                        }, function(data) {
                            tipsAlert.close();
                            t.loadData();
                        }, function(code, msg) {
                            tipsAlert.close();
                            if (code == -520) {
                                router.navigate('login', {
                                    trigger: true
                                });
                            } else {
                                tipsAlert.openAlert({
                                    content: msg
                                });
                            }
                        });
                    },
                    onCancel: function(e) {
                        tipsAlert.close();
                    }
                });

                // tipsAlert.openAlert({
                //     content: '敬请期待!'
                // });
            },
            //设置零售价
            priceSalesKeyUp: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                var userPrice = current.val();
                var priceSales = current.attr('price');
                var productId = current.parent().parent().attr("p-id");

                var postData = {
                    productId: productId,
                    userPrice: userPrice
                };
                tipsAlert.openLoading({
                    content: '加载中...'
                });
                ProductApi.changeProductPrice(postData, function(data) {
                    tipsAlert.close();
                    //设置零售价成功
                    current.attr('price', userPrice);
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                        //还原价格
                        current.val(priceSales);
                    }
                });
            },
            //设置提成金额
            commissionKeyUp: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                var commission = current.val();
                var priceSales = current.attr('price');
                var productId = current.parent().parent().attr("p-id");

                var postData = {
                    productId: productId,
                    commission: commission
                };
                tipsAlert.openLoading({
                    content: '加载中...'
                });
                ProductApi.changeProductPrice(postData, function(data) {
                    tipsAlert.close();
                    //设置零售价成功
                    if (data && data.commission) {
                        var val = parseFloat(data.commission).toFixed(2);
                        current.val(val);
                        current.attr('price', val);
                    }

                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                        //还原价格
                        current.val(priceSales);
                    }
                });
            },
            //点击分类
            category: function(e) {
                var t = this;

                t.$el.find('.category').removeClass('active');
                $(e.currentTarget).addClass('active');

                var cateId = $(e.currentTarget).attr('cate-id');
                t.productCategoryId = cateId || 0;

                if (t.productCategoryId == 0) {
                    //搜索全部产品
                    t.productCategoryId = '';
                }

                //搜索该分类下的产品
                t.page = 1;
                t.selectProduct();
            },
            topButton: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                t.$el.find('.icon-check').removeClass('icon-checked');
                current.addClass('icon-checked');

                //重新查询产品
                t.page = 1;
                t.selectProduct();
            },
            selectProduct: function(e) {
                var t = this;
                var isStokDom = t.$el.find('.hiddenStock.icon-checked');
                if (isStokDom && isStokDom.length > 0) {
                    t.loadData("true");
                } else {
                    t.loadData();
                }
            },
            //快速下单
            quickOrder: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                var productBarCode = current.attr("productBarCode");
                if (!productBarCode) {
                    tipsAlert.openToast({
                        content: '该商品没有商品条码'
                    });
                    return false;
                }
                //缓存商品条码
                Cache.set("productBarCode", productBarCode);
                //清空分页缓存
                Cache.set('page', '');
                Cache.set('totalPages', '');
                //跳转到下单页
                router.navigate('orderList', {
                    trigger: true
                });
            },
            //跳转收银也
            goCash: function(e) {
                var t = this;
                Cache.set('orderId', '');
                Cache.set('totalPrice', '');
                Cache.set("productBarCode", '');
                //清空分页缓存
                Cache.set('page', '');
                Cache.set('totalPages', '');


                router.navigate('orderList', {
                    trigger: true
                });
            },
            goIndex: function() {
                var t = this;
                Cache.set('orderId', '');
                Cache.set('totalPrice', '');
                Cache.set("productBarCode", '');
                //清空分页缓存
                Cache.set('page', '');
                Cache.set('totalPages', '');

                router.navigate('index', {
                    trigger: true
                });
            },
            loadData: function(isHideLackStock) {
                var t = this;

                var productName = t.$el.find('.productName').val();
                Cache.set('productName', productName); //缓存产品名称

                var postData;
                if (isHideLackStock) {
                    postData = {
                        productName: productName,
                        isHideLackStock: "true",
                        productCategoryId: t.productCategoryId,
                        page: t.page
                    };
                } else {
                    postData = {
                        productName: productName,
                        productCategoryId: t.productCategoryId,
                        page: t.page
                    };
                }

                //设置分页缓存
                Cache.set('page', t.page);


                tipsAlert.openLoading({
                    content: '加载中...'
                });
                ProductApi.getProductPage(postData, function(data) {
                    tipsAlert.close();
                    if (data && data.currentRecords) {
                        t.products = data.currentRecords;
                        t.totalPages = data.totalPages;
                        //解决分页缓存带来的bug
                        if (t.page > data.totalPages && data.totalPages != 0) {
                            t.page = 1;
                            t.loadData();
                        }
                        //设置分页缓存
                        Cache.set('totalPages', t.totalPages);
                        //填充用户列表
                        t.fillProduct(data.currentRecords);
                        //渲染分页按钮
                        t.renderFootPage(data);
                    }
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                    }
                });
            },
            //r如果有缓存  填充页面
            fillProduct: function(list) {
                var t = this;
                if (t.page <= 1) {
                    t.$el.find('.prePage span').text('');
                } else {
                    t.$el.find('.prePage span').text('上一页');
                }
                if (t.page >= t.totalPages) {
                    t.$el.find('.nextPage span').text('');
                } else {
                    t.$el.find('.nextPage span').text('下一页');
                }
                if (list && list.length > 0) {
                    t.$el.find('.productList').html('');
                    for (var i = 0; i < list.length; i++) {
                        var product = list[i];
                        var imgUrl = '';
                        if (product.attachments && product.attachments.length > 2) {
                            imgUrl = $nvwa.dictionary.storage_url + '/' + eval('(' + product.attachments + ')')[0].storeName
                        }
                        var tdImg = '';
                        if (imgUrl) {
                            tdImg = '<img src="' + imgUrl + '" width="70" height="50" style="vertical-align: middle;">';
                        }
                        var shopPrice = product.shopOriginPrice;
                        if (t.isBranchStore && t.isBranchStore == true) {
                            var community = Cache.getCommunity();
                            if (community && community.increaseRatio) {
                                shopPrice = parseFloat(product.shopOriginPrice * (1 + Number(community.increaseRatio) / 100)).toFixed(2);
                            }
                        }
                        var str = '<tr></tr>' +
                            '<tr p-id="' + product.id + '">' +
                            '<td class="left-radius10" >' + (i + 1) + '</td>' +
                            '<td class="goDetail cp" >' + tdImg + '</td>' +
                            '<td class="width300 goDetail cp" style="width:400px;">' + product.name + '</td>' +
                            '<td class="' + (t.isNotManager ? "hidden" : "") + ' ' + (t.isNotShowBranchShopPrice ? "hidden" : "") + '">' + shopPrice + '</td>' +
                            '<td style="width:100px;">' + product.price + '</td>' +
                            '<td class="" style="width:100px;">￥ <input type="text" ' + (t.isNotManager ? "readonly" : "") + ' class="priceSales p5" style="width:60px;border-radius: 8px;    border: 1px solid #d3def0;  ' + (t.isNotManager ? "border:0;" : "") + '" value="' + product.priceSales + '" price="' + product.priceSales + '"/></td>' +
                            '<td class="" style="width:100px;">￥ <input type="text" ' + (t.isNotManager ? "readonly" : "") + ' class="commission p5" style="width:60px;border-radius: 8px;    border: 1px solid #d3def0; ' + (t.isNotManager ? "border:0;" : "") + '" value="' + product.commission + '" price="' + product.commission + '"/></td>' +
                            '<td style="width:100px;">' + t._getStockName(product.mount) + '</td>' +
                            '<td class="right-radius10" style="width:150px;"><a href="javascript:void(0)" class="a_btn btn_block quickOrderNew btn_radius quickOrder" productBarCode="' + product.productBarcode + '">快速下单</a></td>' +
                            '</tr>';

                        t.$el.find('.productList').append(str);
                    }
                } else {
                    t.$el.find('.productList').html('没有查询到数据...');
                }
            },
            //根据库存数量 获取库存名称
            _getStockName: function(num) {
                var t = this;
                if (num >= 10) {
                    return "充足";
                } else if (num >= 1 && num < 10) {
                    return "紧张";
                } else {
                    return "售罄";
                }
            },
            //加载产品分类列表
            loadCategory: function() {
                var t = this;

                tipsAlert.openLoading({
                    content: '加载中...'
                });
                ProductApi.getProductCategoryList({}, function(data) {
                    tipsAlert.close();
                    if (data && data.categoryList) {
                        //填充产品分类
                        t.fillProductCategory(data.categoryList);
                    }
                }, function(code, msg) {
                    tipsAlert.close();
                    if (code == -520) {
                        router.navigate('login', {
                            trigger: true
                        });
                    } else {
                        tipsAlert.openAlert({
                            content: msg
                        });
                    }
                });
            },
            //r如果有缓存  填充页面
            fillProductCategory: function(list) {
                var t = this;
                if (list && list.length > 0) {
                    t.$el.find('.productCategory').html(' <li class="active category" cate-id="0">全部</li>');
                    var other = '';
                    for (var i = 0; i < list.length; i++) {
                        var productCategory = list[i];
                        if (productCategory.name === '其他') {
                            var other = '<li class="category" cate-id="' + productCategory.id + '">' + productCategory.name + '</li>';
                        } else {
                            var str = '<li class="category" cate-id="' + productCategory.id + '">' + productCategory.name + '</li>';
                            t.$el.find('.productCategory').append(str);
                        }
                    }
                    if (other) {
                        t.$el.find('.productCategory').append(other);
                    }
                }
            },
            //跳转指定页
            goPage: function(e) {
                var t = this;
                var current = $(e.currentTarget);
                var page = current.attr('page');
                if (!page) {
                    page = t.$el.find('.t_center .page').val() || 1;
                }
                if (page <= parseInt(t.$el.find('.totalPage').text() || 1)) {
                    t.page = page;
                }

                t.loadData();
            },
            renderFootPage: function(data) {
                var t = this;
                var pageList = [];
                var page = data.currentPage || 1;
                var totalPage = data.totalPages || 1;

                if (page <= 3) {
                    for (var i = 1; i <= page; i++) {
                        pageList.push(i);
                    }
                } else {
                    for (var i = 3; i >= 0; i--) {
                        pageList.push(page - i);
                    }
                }
                if (page + 3 >= totalPage) {
                    for (var i = 1; i <= (totalPage - page); i++) {
                        pageList.push(page + i);
                    }
                } else {
                    for (var i = 1; i <= 3; i++) {
                        pageList.push(page + i);
                    }
                }

                if (pageList && pageList.length > 0) {
                    t.$el.find('.pageList').html('');
                    for (var i = 0; i < pageList.length; i++) {
                        var activeClass = '';
                        if (pageList[i] == t.page) {
                            activeClass = "normal-bg-color"
                        }
                        t.$el.find('.pageList').append('<a href="javascript:void(0)" class="a_btn btn_block btn_page ' + activeClass + ' goPage" page="' + pageList[i] + '">' + pageList[i] + '</a>')
                    }
                }
                t.$el.find('.t_center .page').val('');
                t.$el.find('.totalPage').text(totalPage);
            },

            /*
             * 构造数据
             */
            _buildData: function(afterrender) {
                var t = this;

            }

        });
        return LayoutView;
    });