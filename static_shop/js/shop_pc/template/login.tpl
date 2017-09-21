<!-- <body>
    <div class="row navbar-fixed-top">
        <div class="col-md-12 text-center home-title">
          <label class="goBack pull-left hidden"><span class="glyphicon glyphicon-menu-left"></span></label>
          <label class="navbar-btn">环球牛品</label>
        </div>
    </div>
	<div class="container has_header overflow-scroll">
		<form role="form">
		  <div class="form-group "><button type="button" class="newOrder btn btn-default btn-block" style="">下单</button></div>
      <div class="form-group "><button type="button" class="work shop btn btn-default btn-block" style="display:none;">订单管理</button></div>
      <div class="form-group "><button type="button" class="visit member btn btn-default btn-block" style="display:none;">会员管理</button></div>
      <div class="form-group "><button type="button" class="watt product btn btn-default btn-block" >产品管理</button></div>      
			<div class="form-group home-bottom"><button type="button" class="logout btn btn-danger btn-block">登出当前用户</button></div>
		</form>
	</div>
</body> -->

<div id="pg_box" style=" background: #f5f6f7;padding:0;">

 <form id="" autocomplete="off" class="ng-pristine ng-valid" method="post"><!-- ngView:  --><div id="main_wraper" class="login_wrap ng-scope" ng-view="">
    <div class="wraper ng-scope">
        <div class="logo">
            <a href="javascript:void(0)" style="cursor: default;"><i class="icon-logo"></i></a>
        </div>
        <div class="inputwrap login-input noContent" ng-class="{errorfocus:emailError}">
            <label class="lable-login"><i class="icon-user"></i></label>
            <input type="text" autocomplete="off" class="padr1 ng-pristine ng-valid ng-touched" ng-model="username" id="email"  placeholder="手机号码"  tabindex="1">
            <a href="javascript:void(0);" class="inputclear input-clear ng-hide"><i class="icon-clear"></i></a>
            <div class="cache_box ng-hide">
                <ul>
                </ul>
            </div>
        </div>
        <div class="errortip ng-binding ng-hide" ng-class="{error:emailError}" ng-show="emailError" ng-init="emailError=0"></div>


        <div ng-password="login">
        <div class="inputwrap input-password login-input" ng-class="{errorfocus:passwordError}">
            <label class="lable-login"><i class="icon-lock"></i></label>
            <input ng-model="password" id="password" type="password" placeholder="密码" validate="" name="password" ng-focus="vaPasswordFocus($event)" ng-blur="vaPasswordBlur($event)" class="ng-pristine ng-untouched ng-valid" history_value="" tabindex="2">
            <a href="javascript:void(0);" class="input-clear inputclear ng-hide"><i class="icon-clear"></i></a>
        </div>
        <div class="errortip ng-binding ng-hide" ng-class="{error:passwordError}" ng-show="passwordError" ng-init="passwordError=0"></div>
        </div>


        <!-- 验证码初始化状态 -->
        <div class="smswrap clearfix ng-hide" ng-show="showVcode" ng-class="{errorfocus:vCodeError}">
            <div class="changeimg">
                <a href="javascript:void(0)" ng-click="changeLoginCode()"><i class="icon-change"></i>换一换</a> 
                <span><img id="vCodeImgElem" ng-click="changeLoginCode()" src="" vcodeinit="false"></span>
            </div>
            <div class="authcode imgcode"><input type="text" class="padr1" ng-focus="vaVcodeFocus($event)" ng-limit-code="4" ng-blur="vaVcodeBlur($event)" id="vCode" placeholder="请输入图片内容" history_value="" name="password" tabindex="3"></div>
        </div>
        <div class="errortip ng-binding ng-hide" ng-class="{error:vCodeError}" ng-show="vCodeError" ng-init="vCodeError=false"></div>
        <div class="tiptext">
            <label for="saveAccount" ng-click="saveAccount=saveAccount?false:true;" href="javascript:void(0);" class="inherit"><span class="icon-check"></span>下次自动登录</label>
            <span class="tipright"><a href="javascript:void(0)" ng-click="findPassword()" class="btn-fotgetPwd" style="color:#29e;">忘记密码?</a></span>
        </div>

        <div class="submitwrap">
            <a href="javascript:void(0);" class="btn-submit" submit-click="submitLogin()">登 录</a>
        </div>
        <div>
        	<p>
        		<a style="color:#42a5f0;font-size:12px;" href="javascript:;">新用户注册</a>
        	</p>
        </div>
        <div class="tiplink">
            <a href="javascript:void(0)" ng-mousedown="nofocusclick($event,register_url)" style="display:none;">没有帐号，免费注册 <i class="icon-arrow"></i></a>
        </div>
    </div>
</div><input type="" class="position_hidden"></form>  

</div><!--pg_box-->  


