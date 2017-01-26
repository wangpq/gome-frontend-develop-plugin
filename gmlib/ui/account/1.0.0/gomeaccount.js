function toNextConfirm(contextPath){
	//var question = $("#question_id").val();	
	var question = $("#questionId").val();	
	var answer = $("#answerId").val();
	  if(question=='' || question.length<6 || question.length>20){
			$("#questionTips").html("<span style='color:red;'>问题长度为6-20位字符,请确认!</span>");
			$("#questionTips").focus();
			return ;
		}else{
			$("#questionTips").html("");
		}
		if(answer=='' || answer.length<6 || answer.length>20){
			$("#answerTips").html("<span style='color:red;'>答案长度为6-20位字符,请确认!</span>");
			$("#answerTips").focus();
			return ;
		}else{
			$("#answerTips").html("");
		}
	$("#questionBox").hide();
	$("#myQuestionTd").html(question);
	$("#myAnswerTd").html(answer);
	$("#questionConfirmBox").show();
}
function toNextConfirmForUpdate(contextPath){
	
	var question = $("#questionId").val();
	var answer = $("#answerId").val();
	 if(question=='' || question.length<6 || question.length>20){
			$("#questionTip").html("<span style='color:red;'>问题长度为6-20位字符,请确认!</span>");
			$("#questionTip").focus();
			return ;
		}else{
			$("#questionTip").html("");
		}
		if(answer=='' || answer.length<6 || answer.length>20){
			$("#answerTipId").html("<span style='color:red;'>答案长度为6-20位字符,请确认!</span>");
			$("#answerTipId").focus();
			return ;
		}else{
			$("#answerTipId").html("");
		}
	$("#questionBox").hide();
	$("#myQuestionTd").html(question);
	$("#myAnswerTd").html(answer);
	$("#questionConfirmBox").show();
	$("#securityPasswordSetted").text("请牢记以下安全保护问题！以便找回虚拟帐号密码时使用。");
}

function checkThroughNext(){
	$("#questionId").attr("disabled",false);
	$("#headerTip").text("请设置密码保护问题。安全保护问题将作为您唯一的、通用的身份校验，请认真设置！安全保护问题可用于找回虚拟账户密码。");
	$("#questionSpan").html("<input type='text' id='question' value=''/>");
	$("#nextStep").hide();
	$("#updateSecurityPasswordDiv").show();
	$("#updateAnswerDiv").hide();
	$("#updateSQDiv").show();
}

function validateOldAnswer(contextPath){
	var id = $("#question_id").val();
	var question =$("#questionId").val();
	var answer = $("#answerId").val();		
	var url = contextPath+"/myaccount/includes/ajaxValidateSecurityQuestion.jsp"
	$.ajax({
		   type: "post",
		   url: url,
		   data:{SQId:id,SQCode:question,SQValue:answer},		  
		   success: function(data) {
			   	var result =$.trim(data);
			   	if(result=='true'){
			   		//$("#saveSecurityQuestionMessage").text("设置安全问题成功!");
			   		//alert("设置安全问题成功!");
			   		//$("#successNotice").show();
			   		//$("#updateOldAnswer").show();
			   		//$("#question").attr("disabled",false);
			   		$("#nextStep").show();
			   		$("#updateSecurityPasswordDiv").hide();
			   	}else{
			   		alert(result);
			   		return false;
			   		//$("#saveSecurityQuestionMessage").text(result);
			   	}
			}
		 });
}
function validateAnsForForgetPas(contextPath){
	var id = $("#forgetPasswordQuestionId").val();
	var question =$("#forgetPasswordQuestionValue").val();
	var answer = $("#forgetPasswordAnswer").val();
	
	
	var url = contextPath+"/myaccount/includes/ajaxValidateSecurityQuestion.jsp"
	$.ajax({
		type: "post",
		url: url,
		data:{SQId:id,SQCode:question,SQValue:answer},		  
		success: function(data) {
			var result =$.trim(data);
			if(result=='true'){
				//$("#saveSecurityQuestionMessage").text("设置安全问题成功!");
				//alert("设置安全问题成功!");
				//$("#successNotice").show();
				//$("#updateOldAnswer").show();
				//$("#question").attr("disabled",false);
				$("#resetAccountPassword").show();
				$("#validateForgetPwdAnswer").hide();
			}else{
				alert(result);
				return false;
				//$("#saveSecurityQuestionMessage").text(result);
			}
		}
	});
}

/*
 * 安全问题保存方法
 */
function toAccQuesConfirm(contextPath){
	var id = $("#question_id").val();
	var question =$("#questionId").val();
	var anster = $("#answerId").val();
	if(anster.length<6 || anster.length>20){
		alert("密码为6-20位字符,请确认");
		return false;
	}
	
	var url = contextPath+"/myaccount/includes/ajaxSaveSecurityQuestion.jsp"
	$.ajax({
		   type: "post",
		   url: url,
		   data:{SQId:id,SQCode:question,SQValue:anster},		  
		   success: function(data) {
			   	var result =$.trim(data);
			   	if(result=='true'){
			   		//$("#saveSecurityQuestionMessage").text("设置安全问题成功!");
			   		alert("设置安全问题成功!");
			   		$("#successNotice").show();
			   		$("#questionBox").hide();
			   		$("#questionConfirmBox").hide();
			   	}else{
			   		$("#saveSecurityQuestionMessage").text(result);
			   	}
			}
		 });
}


function loginGome(check){
	if(typeof check == 'fucntion'){
		if(!check()){
			return;
		}
	}
	var loginName=$("#frm #loginName").val();
	var password = $("#frm #loginPassword").val();

	if($.trim(loginName)==''||$.trim(loginName)=='用户名/邮箱/手机号/会员卡'){	
		$("#frm #valiLoginName").html("<p><span style='position:absolute; width:600px; color:red;'>登录名不能为空!</span></p>");
		$("#frm #loginName").focus();
		return ;
	}else{
		$("#frm #valiLoginName").html("");
	}
	if($.trim(password)==''){
		$("#frm #valiPassword").html("<p><span style='color:red;'>请输入密码!</span></p>");
		$("#frm #loginPassword").focus();
		return ;
	}else{
		$("#frm #valiPassword").html("");
	}
	
	if(null!=$("#authenticCodeForLogin").val()){
		if($("#authenticCodeForLogin").val().length < 4){
			var messageSpan = $("#validate_captcha_login_div span");
			messageSpan.css("color","red");
			messageSpan.text("请输入验证码");
			$("#frm #authenticCodeForLogin").focus();
			return;
		}
	}
	if($("#chkRememberUsername").is(':checked')){
		$.cookie("loginName", loginName, { expires: 365 });
	}else{
		$.cookie("loginName", null);
	}
	$("#frm").submit();
}

function validatePassword(boxId){
	var memberPassword = $(boxId + " .memberPassword").val();
	var confirmPassword = $(boxId + " .confirmPasswrod").val();
	if(memberPassword != confirmPassword){
		$(boxId + " .password2Tip").html("<span style='color:red;'>密码不一致，请修改</span>");
		return false;
	}else{
		$(boxId + " .password2Tip").html("");
		return;
	}
}

/**
 * 找回密码
 */
function forgotPassword(){
	$(".error div").hide();
	var login= $("#loginName").val();
	if(login ==""){
		$("#loginNameTip1").show();
		return ;
	}
	var type=$("#sendType").val();		
	if(!type || type =='1'){
		var email= $("#email").val();
		if(email==""){
			$("#emailError1").show();
			return ;
		}
		if(!validateEmail("#email")){
			$("#emailError2").show();
			return ;
		}
	}else if(type=='2'){
		var mobile= $("#mobile").val();
		if(mobile==""){
			$("#mobileError1").show();
			return ;
		}
		if(!validateMobileNumber("#mobile")){
			$("#mobileError2").show();
			return ;
		}		
	}
	$("#forgotPasswordForm").submit();
}

function layerShowForPoint(ev, layerName) {
    var isIE = $.browser.msie && !$.support.opacity,
    isIE6 = isIE && $.browser.version < 7;
    if (!$("#Overlay").length > 0) {
        if (!isIE6) {
            $("body").append("<div id='Overlay' style='background:#000;cursor: pointer;display: block;filter:alpha(opacity=60);opacity: 0.6;height:100%;width:100%; position: fixed; left: 0;top: 0;z-index:9999998'></div>")
        } else {
            $("body").css("height", "100%");
            $("body").append("<div class='overlay' id='Overlay'><iframe  frameborder=0 id='frame1' style='background:#000;filter:alpha(opacity=60);opacity: 0.6;height:100%;width:100%;'></iframe></div>")
        }
    }
	/* 实现弹出 */
    $("#Overlay").show();
    var od = $("#" + layerName);
    var itop = (document.documentElement.clientHeight - od.height()) / 2;
    var ileft = (document.documentElement.clientWidth - od.width()) / 2;
    if (!isIE6) {
        od.css("top", itop).css("left", ileft).css("position", "fixed").css("z-index","9999999").show();
    } else {
        od.css("position", "absolute").show();
        od.addClass("chagetop");
    }
	//SetCwinHeight('loginiframe');这个在登录弹出的时候调用
} 
function closeLayerForPoint(layerName) {
    $("#" + layerName).hide();
    $("#Overlay").hide();
}
function initItgData(divId,couponValue){
	if((couponValue!=10)&&(couponValue!=20)&&(couponValue!=50)&&(couponValue!=100)&&(couponValue!=200)){
		alert("无对应金额的红卷，请重新选择");
		return;
	}
	var myPoint = parseInt($("#mypoint").text());	
	$("#itg_num").val("1");
	if(myPoint<parseInt(couponValue)){
		$("#itg_juan3").text(couponValue);
		layerShowForPoint(null,'layer_itgLayer3');	
	}else{
		$("#itg_juan").text(couponValue);
		$("#itg_zhang").text(parseInt(myPoint/couponValue));
		layerShowForPoint(null,divId);		
	}	
		
}

function addQuantity(){
	if(parseInt($("#itg_num").val())<parseInt($("#itg_zhang").text())){
		$("#itg_num").val(parseInt($("#itg_num").val())+1);
	}
}

function checknum(){
	if(parseInt($("#itg_num").val())>parseInt($("#itg_zhang").text())){
		$("#itg_num").val($("#itg_zhang").text());
	}
}

function checkMinNum(){
	if(parseInt($("#itg_num").val())<1){
		$("#itg_num").val(1);
	}	
}

function subtractQuantity(){
	if(parseInt($("#itg_num").val())>1){
		$("#itg_num").val(parseInt($("#itg_num").val())-1);
	}
}

function exchange(){
	var couponAmount = parseInt($(":radio[name=juan][checked]").val());
	$("#change").disabled=true;
	var url = "executeConvert.jsp";
	$.ajax({
		 url: url,
		 type:'post',
		 data:{amount:couponAmount},
		 success: function(date){
		    if($.trim(date)=='true'){
		    	$("#change").disabled=false;
				lhh.layerShow('nobj','uc-dytsc');
			}else{
				alert("操作失败，请稍后再试！");
				$("#change").disabled=false;
			}
		 }
	});
}

/*function pageTurning(pageNum){
	$("#pointConvertHistory").load("pointConvertHistory.jsp",{pageNum:1},{Date:"0"});
	$("#gomeMyInteralInfo").load("../gadgets/gomeMyInteralInfo.jsp",{pageNum:1},{Date:"0"});
}*/
/**
 * 验证邮箱地址
 * @param tager
 */
function validateEmail(tager){
	var emailAddress = $.trim($(tager).val());
	if(emailAddress==""){
		return true;
	}
	var reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if(reg.test(emailAddress)){
		return true;
	}else{
		return false;
	}
}


function validateForMobile(tager){
	isMobile=false;
	var mobileNumber = $.trim($(tager).val());
	if(mobileNumber.length<11 || !validateMobileNumber(tager)){
		$("#fm .regMobileTip").html("<span style='color:red;'>手机号码不正确,请重新输入!</span>");
		$("#mobileRegisterValidateResult").val('false');
		$("#fm #mobileMessage").removeClass("cur");
		return ;
	}else{
		var pathForMobile="../myaccount/gadgets/validateMobile.jsp";//加入验证路径
		var pDataForMobile={
				validateMobileName:mobileNumber
		};
		 $.ajax({
			   type: "post",
			   url: pathForMobile,
			   data:pDataForMobile,
			   success: function(data) {
					var dataArray=data.split("|");
					if(dataArray.length>1){						
						$("#fm .regMobileTip").html("<span style='color:red;'>手机号已被注册，请更换！</span>");
						$("#mobileRegisterValidateResult").val('false');
						$("#fm #mobileMessage").removeClass("cur");
						$("#fm #mobileMessage").removeAttr("onclick");
					}else{
						$("#fm #mobileMessage").addClass("cur");
						$("#mobileRegisterValidateResult").val('true');
						$("#fm .regMobileTip").text("手机号可用");
						$("#fm #mobileMessage").attr("onclick","sendMobileVerifyCode($('#fm .regMobile').val(), $('#fm .captcha').val())");
						isMobile=true;
					}
				}
			 });		
	}
}
var isMobile=false;
function validateMobileNumberForNorm(tager){
	isMobile=false;
	var mobileNumber = $.trim($(tager).val());
	if(mobileNumber.length<11 || !validateMobileNumber(tager)){
		$("#fp .email_regTip").html("<span style='color:red;'>手机号码不正确,请重新输入!</span>");
		return ;
	}else{
		var pathForMobile="../myaccount/gadgets/validateMobile.jsp";//加入验证路径
		var pDataForMobile={
				validateMobileName:mobileNumber
		};
		 $.ajax({
			   type: "post",
			   url: pathForMobile,
			   data:pDataForMobile,
			   success: function(data) {
					var dataArray=data.split("|");
					if(dataArray.length>1){						
						$("#fp .email_regTip").html("<span style='color:red;'>手机号已被注册，请更换！</span>");
					}else{
						$("#fp .email_regTip").text("手机号可用");
						isMobile=true;
					}
				}
			 });		
	}
}

function validateMobileNumber(tager){
	return checkMobileNumber($(tager).val());
}
/**
 * 关于手机校验统一改成一种校验方式
 * regMobile以/atg/store/StoreConfiguration.mobilePattern为准
 * author:刘海林
 * date:2013年4月15日16:18:58
 * @param mobileNumber
 * @returns {Boolean}
 */
function checkMobileNumber(mobileNumber){
	var regMobile=/^((1[3|4|5|7|8])\d{9})$/;
	var mobileNumber = $.trim(mobileNumber);
	if(regMobile.test(mobileNumber)){
		return true;
	}else{
		return false;
	}
}

function validateMobileRegister(){
	var mobileNumber = $.trim($("#fm .regMobile").val());
	var userName = $.trim($("#fm .loginName_reg").val());
	var memberPassword = $.trim($("#fm .memberPassword").val());
	var confirmPasswrod = $.trim($("#fm .confirmPasswrod").val());
	var emailAddress =  $("#fm .email-input").val();
	var userNameValid=$("#fm .loginName_regTip").attr("valid");
	var verifyCode = $.trim($("#fm .verifyCode").val());	
	if(mobileNumber==''){
		$("#fm .regMobileTip").html("<span style='color:red;'>请输入手机号码!</span>");
		return ;
	}
	if(verifyCode==''){
		$("#fm .verifyCodeMessage").html("<span style='color:red;'>请输入手机验证码!</span>");
		return ;
	}
	if(userNameValid=='false'){
		if($("#fm .loginName_regTip").text()=='')
			$("#fm .loginName_regTip").html("<span style='color:red;'>用户名不合法,请重新输入!</span>");
		return ;
	}
	if(!verifyPassword('#fm .memberPassword','#fm .loginName_reg','#fm .password1Tip')){
		$("#fm .memberPassword").val("");
		$("#fm .confirmPasswrod").val("");
		return ;
	}	
	if(memberPassword!=confirmPasswrod){
		$("#fm .password2Tip").html("<span style='color:red;'>密码不一致,请重新输入密码!</span>");
		$("#fm .memberPassword").val("");
		$("#fm .confirmPasswrod").val("")
		return ;
	}else{		
		$("#fm .pwd2_succeed").text("密码有效!");
	}
	
	//验证邮箱地址
	if(!validateEmail($("#fm .email-input"))){
		$("#fm .email_regTip").html("<span style='color:red;'>邮箱地址格式不正确,请重新输入!</span>");
		return;
	}
	var mobileCodeResult =$("#mobile-code-result").val();
	if(mobileCodeResult && mobileCodeResult=='true'){
		$("#fm").submit();
	}
}
var isEmail=false;
function validateNormalRegister(check){
	if((typeof check) == 'function'){
		if(!check()){
			return;
		}
	}
	var userName = $.trim($("#fp .loginName_reg").val());
	var memberPassword = $.trim($("#fp .memberPassword").val());
	var confirmPasswrod = $.trim($("#fp .confirmPasswrod").val());
	var emailAddress =  $("#fp .email-input").val();
	var userNameValid=$("#fp .loginName_regTip").attr("valid");
	if(userNameValid=='false'){		
		$("#fp .loginName_regTip").html("<span style='color:red;'>用户名非法或已经存在，请更换用户名</span>");
		return ;
	}
	var validateResult=verifyUserNameForSub('#fp .loginName_reg','#fp .loginName_regTip');
	if(!validateResult){
		$("#fp .loginName_regTip").html("<span style='color:red;'>用户名非法或已经存在，请更换用户名</span>");
		return ;
	}
	if(!verifyPassword('#fp .memberPassword','#fp .loginName_reg','#fp .password1Tip')){
		$("#fp .memberPassword").val("");
		$("#fp .confirmPasswrod").val("")
		return ;
	}
	if(userName.length<6){		
		$("#fp .loginName_regTip").html("<span style='color:red;'>用户名长度不够,请重新输入!</span>");
		return ;
	}	
	if(userName.length>12){		
		$("#fp .loginName_regTip").html("<span style='color:red;'>用户名长度过长,请重新输入!</span>");
		return ;
	}	
	if(memberPassword!=confirmPasswrod){
		$("#fp .password2Tip").html("<span style='color:red;'>密码不一致,请重新输入密码!</span>");
		$("#fp .memberPassword").val("");
		$("#fp .confirmPasswrod").val("")
		return ;
	}else{		
		$("#fp .pwd2_succeed").text("密码有效!");
	}
	
	var activeType = $(".activemethods input:checked").val();
	var email = $.trim($("#fp .email-input").val());
	var phone = $.trim($("#fp .phone-input").val());
	if("email"==activeType){
		if(!isEmail){
			return ;
		}
	}else if("mobile"==activeType){
		if(!isMobile){
			return ;
		}
	}
	$("#fp").submit();
}
function commonSendMobileCode(mobileNumber, captcha, handlers){
	if(!checkMobileNumber(mobileNumber)){
		handlers.error("手机号码格式错误,请重新输入！");
		return;
	}
	var pathForMobile="../global/gome/mobileCodeSendAndVerify.jsp";
	var pDataForMobile={
			mobileNumber: mobileNumber,
			captcha: captcha,
			requestType: "Send"
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data: pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(!isSuccess){
			    	handlers.error("验证码发送失败,请重新获取！");
			    	return;
			    }else if(isSuccess=='true'){
			    	handlers.success();
			    }else if(isSuccess=='expireCaptcha'){
			    	handlers.captchaError("验证超时,点击图片重新验证！");
			    }else if(isSuccess=='wrongCaptcha'){
			    	handlers.captchaError("验证码输入错误,请重新输入！");
			    }else{
			    	handlers.error("验证码发送失败,请重新获取！");
			    }
			},
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	handlers.error("验证码发送失败，请重新获取！");
            }
	});
	
}


function sendMobileCode(){
	if(!checkMobile()) {
		return;
	}
	$("#sendMobileCodeId").addClass('r-err');
	$('#sendMobileCodeId').unbind("click");
	$('#sendMobileCodeId').css({"cursor":"default","text-decoration":"none","color":"grey"});
	$("#sendMobileCodeId").html("<span style=\"color:red;\" class=\"miaoshu\" id=\"miaoshu1Id\"></span>秒 后重新获取");
	timepiece1(60);
	
	var pathForMobile="../../global/gome/sendMobileCode.jsp";
	var pDataForMobile={
			requestType: "Send"
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data: pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess=='false'){
			    	alert("验证码发送失败，请重新获取");
			    } else if (isSuccess=='mobile-null') {
			    	alert("您还没有手机号，请完善个人资料！");
			    } else if (isSuccess=='mobile-error') {
			    	alert("手机号码格式错误!");
			    } else if (isSuccess=='mobile-not-activated') {
			    	alert("您手机还没激活不能获得验证码，请您激活手机！");
			    }
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			    alert("验证码发送失败，请重新获取");
			}
	});
	
}

function sendMobileCodeForUpdatePassword(){
	if(!checkMobile()) {
		return;
	}
	$("#sendMobileCodeId1").addClass('r-err');
	$('#sendMobileCodeId1').unbind("click");
	$('#sendMobileCodeId1').css({"cursor":"default","text-decoration":"none","color":"grey"});
	$("#sendMobileCodeId1").html("<span style=\"color:red;\" class=\"miaoshu\" id=\"miaoshu2Id\"></span>秒 后重新获取");
	timepiece2(60);
	
	var pathForMobile="../../global/gome/sendMobileCode.jsp";
	var pDataForMobile={
			requestType: "Send"
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data: pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess=='false'){
			    	alert("验证码发送失败，请重新获取");
			    } else if (isSuccess=='mobile-null') {
			    	alert("您还没有手机号，请完善个人资料！");
			    } else if (isSuccess=='mobile-error') {
			    	alert("手机号码格式错误!");
			    } else if (isSuccess=='mobile-not-activated') {
			    	alert("您手机还没激活不能获得验证码，请您激活手机！");
			    }
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			    alert("验证码发送失败，请重新获取");
			}
	});
	
}

function sendActiveModileCode(){
	var mobileNumber = $("#setphone #mobileNumber").val();
	var handlers = {
		success: function(){
			$('#setphone').html($('#sendMobileCode').html());
			$("#showMobileNumber").text(mobileNumber);
			$("#setphone #mobileNumber").val(mobileNumber)
			timepiece4ActiveMobile(60);
		},
		error: function(message){
			$("#mobileMessage").html("<span style='color:red;'>" + message + "</span>");
		}
	}
	var captcha = "abcd";
	commonSendMobileCode(mobileNumber, captcha, handlers);
}

/**
 * 发送手机注册验证码
 * @param mobileNumber
 */
function sendMobileVerifyCode(mobileNumber, captcha){
	var handlers = {
		success: function(){
			$("#fm .mobileNumber").val(mobileNumber);
			$("#mobileMessage").hide();
			timepiece(60);
		},
		error: function(message){
			$("#fm .regMobileTip").html("<span style='color:red;'>" + message + "</span>");
			$("#mobileRegisterValidateResult").val('false');
		},
		captchaError: function(message){
			$("#fm .authentic-code-tip").html("<span style='color:red;'>" + message + "</span>");
			$("#mobileRegisterValidateResult").val('false');
		}
	}
	
	commonSendMobileCode(mobileNumber, captcha, handlers);
}

function timepiece4ActiveMobile(time){
	time--;
	if(time>0){		
		$("#codeMessage").text("("+time+"秒后)重新获取短信");
		setTimeout("timepiece4ActiveMobile("+time+")",1000);
	}else{
		$("#codeMessage").text("重新获取短信");
	}	
}



function timepiece(time){
	//var time = $("#fm .miaoshu").text();
	time--;
	if(time>0){		
		$("#fm .daoshu").show();
		$("#fm .regMobileTip").text("");
		$("#fm .regMobile").attr("disabled",true);
		$("#fm .miaoshu").text(time)
		 setTimeout("timepiece("+time+")",1000);
	}else{
		$("#fm .daoshu").hide();
		$("#fm .regMobile").attr("disabled",false);
		$("#mobileMessage").show();
	}	
}


function timepiece1(time){
	//var time = $("#fm .miaoshu").text();
	time--;
	if(time>0){		
		$("#miaoshu1Id").text(time)
		 setTimeout("timepiece1("+time+")",1000);
	}else{
		$("#sendMobileCodeId").removeClass('r-err');
		$("#sendMobileCodeId").html("获取短信验证码");
		$('#sendMobileCodeId').bind("click",sendMobileCode);
		$('#sendMobileCodeId1').removeAttr("style");
	}	
}


function timepiece2(time){
	//var time = $("#fm .miaoshu").text();
	time--;
	if(time>0){		
		$("#miaoshu2Id").text(time)
		 setTimeout("timepiece2("+time+")",1000);
	}else{
		$("#sendMobileCodeId1").removeClass('r-err');
		$("#sendMobileCodeId1").html("获取短信验证码");
		$('#sendMobileCodeId1').bind("click",sendMobileCodeForUpdatePassword);
		$('#sendMobileCodeId1').removeAttr("style");
	}	
}

//短信模板优化调用新的方法
function timepiece3(time,codeType){
	//var time = $("#fm .miaoshu").text();
	time--;
	if(time>0){		
		$("#miaoshu1Id").text(time)
		 setTimeout("timepiece3("+time+",'"+codeType+"')",1000);
	}else{
		$("#sendMobileCodeId").removeClass('r-err');
		$("#sendMobileCodeId").html("获取短信验证码");
		$('#sendMobileCodeId').bind("click",function () {sendActivatedMobileCodeNotToken(codeType)} );
		$('#sendMobileCodeId1').removeAttr("style");
	}	
}

/**
 * 手机激活
 */
function activeMobile(){
	var path4ActiveMobile = "../myaccount/includes/mobileCodeSendAndVerify.jsp";
	var mobileNumber = $("#setphone #mobileNumber").val();
	var mobileCode = $("#setphone #mobileCode").val();
	if(mobileCode==''){
		$("#mobileCodeMessage").text("请输入验证码");
		$("#setphone #mobileCode").focus();
		return;
	}
	var pDataForMobile = {
			mobileNumber:mobileNumber,
			requestType:"verify4Active",
			verifyCode:mobileCode
	}
	 $.ajax({
		   type: "post",
		   url: path4ActiveMobile,
		   data:pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess&&isSuccess=='true'){
			    	$('#setphone').html($('#activeSuccess').html());
			    	$("#showMobileNumber").text(mobileNumber);
			    }else{
			    	$("#mobileCodeMessage").text("请输入验证码");
					$("#setphone #mobileCode").focus();
			    }				
			}
	});
}
function verifyMobileCode(mobileCode,mobileNumber){
	if($("#mobileRegisterValidateResult").val() != 'true'){
		return;
	}
	var pathForMobile="../global/gome/mobileCodeSendAndVerify.jsp";
	var pDataForMobile={
			mobileNumber:mobileNumber,
			requestType:"verify",
			verifyCode:mobileCode
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data:pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess&&isSuccess=='true'){
			    	$("#fm .verifyCodeMessage").text("输入正确!");
			    	$("#fm .mobileNumber").val(mobileNumber);
			    	$("#mobile-code-result").val('true');
			    }else if(isSuccess == 'null-value'){
			    	$("#fm .verifyCodeMessage").html("<span style='color:red;'>请输入验证码！</span>");
			    	$("#mobile-code-result").val('false');
			    }else{
			    	$("#fm .verifyCodeMessage").html("<span style='color:red;'>验证码错误,请重新输入！</span>");
			    	$("#mobile-code-result").val('false');
			    }				
			}
	});
}


function verifyMobileCode1(mobileCode,mobileNumber){

	var pathForMobile="../../global/gome/sendMobileCode.jsp";
	var pDataForMobile={
			mobileNumber:mobileNumber,
			requestType:"verify",
			verifyCode:mobileCode
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data:pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess&&isSuccess=='true'){
			    	$("#verifyCodeMemo").text('');
			    	$("#verifyCodelabel").html('<span class="ibox-yes"></span>');
			    	$("#mobile-code-result").val('true');
			    }else{
			    	$("#verifyCodeMemo").text('验证码错误,请重新输入');
			    	$("#mobile-code-result").val('false');
			    }
			}
	});
}

function verifyMobileCode2(mobileCode,mobileNumber){

	var pathForMobile="../../global/gome/sendMobileCode.jsp";
	var pDataForMobile={
			mobileNumber:mobileNumber,
			requestType:"verify",
			verifyCode:mobileCode
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data:pDataForMobile,
		   success: function(data) {
			    var isSuccess = $.trim(data);
			    if(isSuccess&&isSuccess=='true'){
			    	$(".verifyCodeMessage").text("输入正确!");
					$('#verifyCodeMessageChangePassword').show();
					$("#verifyCodeMessage").text("");
			    	$("#mobile-code-result1").val('true');
			    }else{
			    	$("#verifyCodeMessage").text("验证码错误,请重新输入！");
					$("#verifyCodeMessageChangePassword").hide();
			    	$("#mobile-code-result1").val('false');
			    }				
			}
	});
}

/**
 * 验证密码合法性
 * @param tagert
 * @param messagetagert
 */
function verifyPassword(tagert,userNameTagert,messagetagert){
	var passwordValue= $.trim($(tagert).val());
	var loginName =  $.trim($(userNameTagert).val());
	if(passwordValue == null || passwordValue==""){
		$(messagetagert).html("<span style='color:red;'>密码由6-20位数字，字母及下划线组成</span>");
		//$(tagert).focus();
		return false;
	}
	if(passwordValue == loginName){
		$(messagetagert).html("<span style='color:red;'>密码不能与用户名相同</span>");
		//$(tagert).focus();
		return false;
	}else{
		$(messagetagert).text("");
	}
	if(passwordValue.length<6 || passwordValue.length>20){
		$(messagetagert).html("<span style='color:red;'>密码为6-20位字符,请确认</span>");
		//$(tagert).focus();
		return false;
	}else{
		$(messagetagert).text("");
	}
//	var regPassword = /^.{0,2}$|.{21,}|^[^A-Za-z0-9\u4E00-\u9FA5]|[^\w\u4E00-\u9FA5.-]|([_.-])\1/;
	var regPassword = /^\w+$/;
	if(!regPassword.test(passwordValue)) {
		$(messagetagert).html("<span style='color:red;'>密码只能是数字，字母及下划线等组成</span>");
		//$(tagert).focus();
		return false;
	}
	return true;
}

function cleanPage(){
	$("input[type='password']").val("");
	$("input[type='text']").val("");
}

function verifyUserNameForSub(tagert,messagetagert){
	
	var userName = $.trim($(tagert).val());
	if(userName.length<6 || userName.length>20){
		$(messagetagert).html("<span style='color:red;'>用户名为6-12位字符,请确认</span>");
		return false;
	}
	//验证用户名不能为纯数字
	if (!isNaN(userName)) {
		$(messagetagert).html("<span style='color:red;'>用户名不能为纯数字</span>");
		return false;
	}else{
		if(/[^\x00-\xff]/.test(userName)) {
			$(messagetagert).html("<span style='color:red;'>用户名只能是数字，字母及下划线等组成</span>");
   			return false;
   		}
//		var regName = /^.{0,2}$|.{21,}|^[^A-Za-z0-9\u4E00-\u9FA5]|[^\w\u4E00-\u9FA5.-]|([_.-])\1/;
		var regName = /^\w+$/;
		if(!regName.test(userName)) {
			$(messagetagert).html("<span style='color:red;'>用户名只能是数字，字母及下划线等组成</span>");
   			return false;
   		}
	}
	return true
}
function verifyUserName(tagert,messagetagert){
	var userName = $.trim($(tagert).val());
	if(userName.length<6 || userName.length>20){
		$(messagetagert).html("<span style='color:red;'>用户名为6-12位字符,请确认</span>");
		return false;
	}
	//验证用户名不能为纯数字
	if (!isNaN(userName)) {
		$(messagetagert).html("<span style='color:red;'>用户名不能为纯数字</span>");
		return false;
	}else{
		if(/[^\x00-\xff]/.test(userName)) {
			$(messagetagert).html("<span style='color:red;'>用户名只能是数字，字母及下划线等组成</span>");
   			return false;
   		}
//		var regName = /^.{0,2}$|.{21,}|^[^A-Za-z0-9\u4E00-\u9FA5]|[^\w\u4E00-\u9FA5.-]|([_.-])\1/;
		var regName = /^\w+$/;
		if(!regName.test(userName)) {
			$(messagetagert).html("<span style='color:red;'>用户名只能是数字，字母及下划线等组成</span>");
   			return false;
   		}
	}
	var verifyUserNamePath = "../myaccount/gadgets/validateLoginName.jsp";
	var verifyData={
			validateLoginName:userName.toLowerCase()
		};
	$.ajax({
		   type: "post",
		   url: verifyUserNamePath,
		   data:verifyData,		  
		   success: function(data) {
				var dataArray=data.split("|");
				if(dataArray.length>1){	
					$(messagetagert).html("<span style='color:red;'>用户名已经存在，请更换用户名</span>");
					return false;
				}else{
					$(messagetagert).text("用户名可用");
					$(messagetagert).attr("valid","true");
					return true;
				}
			}
		 });
}

//焦点离开文本框时
function valiOnblurForEmail(emailSelector, tipSelector){
	isEmail=false;
	var str = $.trim($(emailSelector).val());
	
	if(str==""){
		$(tipSelector).html("<span style='color:red;'>邮箱不能为空</span>");
		return ;
	}
	var reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if(str.match(reg)==null){
		$(tipSelector).html("<span style='color:red;'>邮箱格式不正确</span>");
		return;
	}

	var path = "../myaccount/gadgets/validateEmail.jsp";
	var pData={
		validateEmail:str
	}

	if(str!="")
	{
		 $.ajax({
		   type: "post",
		   url: path,
		   data:pData,
		   success: function(data) {
				var dataArray=data.split("|");
				if(dataArray.length>1){
					$(tipSelector).html("<span style='color:red;'>邮箱不可用，请更换邮箱</span>");
					return true;
					//$("#"+string+"Tip").addClass("onError");
				}else{
					$(tipSelector).html("邮箱可用");
					isEmail = true;
					return false;
					//$("#"+string+"Tip").removeClass("onError");
					//$("#"+string+"Tip").addClass("onCorrect");
				}
			}
		 });
	}
}

//keyInput,focusInput,blurInput分别对应着登录名输入框键入，得到焦点，失去焦点	
var lntip="用户名/邮箱/手机号/会员卡";
var ln=$("#loginName");
function focusInput(){
	if(ln.val()==lntip){
		$("#valiLoginName").text("");
		ln.val("");
		ln.css({color:"black"})
	}
}
function blurInput(){
	if($.trim(ln.val())==""||$.trim(ln.val())==lntip){
		ln.val(lntip);ln.css({color:"gray"})
		$("#valiLoginName").text("请输入您的登录名");
		$("#valiLoginName").css({color:"red"});
		$("#valiLoginName").show();
	}
}
//focusPWInput,blurPWInput分别对应着密码输入框得到焦点和失去焦点
var pw=$("#loginPassword");
var valpw=$("#valiPassword");
function focusPWInput(){
		valpw.text("");
}
function blurPWInput(){
	if(pw.val().length==0){
		valpw.text("请输入您的密码");
		valpw.css({color:"red"});
		valpw.show();
	}
}
function sendActivatedMobileCodeNotToken(codeType){
	if(!checkMobile()) {
		return;
	}
	$("#sendMobileCodeId").addClass('r-err');
	$('#sendMobileCodeId').unbind("click");
	$('#sendMobileCodeId').css({"cursor":"default","text-decoration":"none","color":"grey"});
	$("#sendMobileCodeId").html("<span style=\"color:red;\" class=\"miaoshu\" id=\"miaoshu1Id\"></span>秒 后重新获取");
	timepiece3(60,codeType);
	
	var pathForMobile="../../global/gome/mobileVerify/MustLogin/activatedMobileNotToken.jsp";
	var pDataForMobile={
			requestType: "Send",
			codeType:codeType
	};
	 $.ajax({
		   type: "post",
		   url: pathForMobile,
		   data: pDataForMobile,
		   success: function(data) {
			   var dataArray = $.trim(data).split(':');
				var checkFlag = dataArray[0];
				var sendFlag = dataArray[1];
				if(checkFlag=="success"){
					if(sendFlag=="success"){
						/*发送成功的处理*/
					}else{
						alert("验证码发送失败，请重新获取");
					}
				}else{
					switch(checkFlag)
					{
					case "Not_Activated":
						alert("您手机还没激活不能获得验证码，请您激活手机！");
						break;
					case "2":
						alert("手机号在黑名单中，请联系客服");
						break;
					case "4":
						alert("该手机号今日验证次数已满，请明日再试");
						break;
					default:
						alert("验证码发送失败，请重新获取");
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			    alert("验证码发送失败，请重新获取");
			}
	});
}
	 

function verifyActivatedMobileCode(verifyCode, codeType) {

	var pathForMobile = "../../global/gome/mobileVerify/MustLogin/activatedMobileNotToken.jsp";
	var pDataForMobile = {
		codeType : codeType,
		requestType : "compare",
		verifyCode : verifyCode
	};
	$.ajax({
		type : "post",
		url : pathForMobile,
		data : pDataForMobile,
		success : function(data) {
			var isSuccess = $.trim(data);
			if (isSuccess == "0") {
				$("#verifyCodeMemo").text('');
				$("#verifyCodelabel").html('<span class="ibox-yes"></span>');
				$("#mobile-code-result").val('true');
			} else {
				$("#verifyCodeMemo").text('验证码错误,请重新输入');
				$("#mobile-code-result").val('false');
			}
		}
	});
}