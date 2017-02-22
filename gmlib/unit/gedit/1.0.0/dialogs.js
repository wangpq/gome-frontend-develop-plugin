// JavaScript Document
function showModalDlg(url, arguments, width, height, left, top, scroll)
{
	sFeatures = "dialogHeight:" + height + "px; dialogWidth:" + width + 
			   "px; scroll:"+(scroll==null?"no":scroll)+"; status:no; resizable:no; help:no";
	if (left != null)
	{
		sFeatures += "; dialogLeft:" + left;
	}
	if (top != null)
	{
		sFeatures += "; dialogTop:" + top;
	}
	var winOption = "height=400,width=600,top=50,left=50,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=0";
	if(navigator.userAgent.indexOf("Chrome") >0){
			return  window.open(url,window, winOption);
	}
	return window.showModalDialog(url, arguments, sFeatures);
}
function showModalDlg2(url, arguments, width, height, left, top, scroll)
{
	sFeatures = "dialogHeight:" + height + "px; dialogWidth:" + width + 
			   "px; scroll:"+(scroll==null?"no":scroll)+"; status:no; resizable:yes; help:no";
	if (left != null)
	{
		sFeatures += "; dialogLeft:" + left;
	}
	if (top != null)
	{
		sFeatures += "; dialogTop:" + top;
	}
	return window.showModalDialog(url, arguments, sFeatures);
}
function showModalDlg3(url, arguments, width, height, left, top, scroll)
{
	var iTop = (window.screen.availHeight - 20 - height) / 2;  
    var iLeft = (window.screen.availWidth - 10 - width) / 2;  
	showModalDlg2(url, arguments, width, height, iLeft, iTop, scroll);
}
function OpenWindow(url, target, width ,height, left, top, isFullscreen)
{
	var flag = "no";
	if (isFullscreen)	flag = "yes";
	sFeatures = "directories= no, width=" + width + ", height=" + height + ", left=" + left + ", top=" + top
		+ ", fullscreen=" + flag + ",";
	window.open(url, null, sFeatures);
}

function showDialog(dialog_type, obj, arguments)
{
	var left = event.screenX;
	var top = event.screenY + 14;
	switch (dialog_type)
	{
		case "calendar":
			var result = showModalDlg("../common/calendar.htm", null, 330, 274, left, top);
			if (result != null) obj.value = result;
			break;
		case "adc": 	// 広告会社
			var result = showModalDlg("../Sz/Sz0201.htm", null, 700, 500, left, top);
			//if (result != null) obj.value = result;
			break;
		case "ad_nsi": // 広告主
			var result = showModalDlg("../Sz/Sz0202.htm", null, 700, 500, left, top);
			//if (result != null) obj.value = result;
			break;
		case "kik": // 企画
			var result = showModalDlg("../Sz/Sz0203.htm", null, 700, 500, left, top);
			//if (result != null) obj.value = result;
			break;
		case "kik_type_group": // 企画分類グループ
			var result = showModalDlg("../Sz/Sz0204.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;
		case "kik_type": // 企画分類
			var result = showModalDlg("../Sz/Sz0205.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "kbo_jkn": // 掲載希望
			var result = showModalDlg("../Sz/Sz0206.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "bus": // 部署
			var result = showModalDlg("../Sz/Sz0207.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "user": // 担当者
			var result = showModalDlg("../Sz/Sz0208.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "no_reason": // 不可理由
			var result = showModalDlg("../Sz/Sz0209.htm", null, 600, 400, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "bmg": // 広告会社別手数料
			var result = showModalDlg("../Sz/Sz0210.htm", null, 720, 450, left, top);
			//if (result != null) obj.value = result;
			break;	
		case "kbo_pap":  // 希望面選択
			var result = showModalDlg("../Sz/Sz0211.htm", null, 350, 260, left, top);
			break;
		case "kek":  // 契約参照
			var result = showModalDlg("../Sz/Sz0212.htm", null, 600, 400, left, top);
			break;
		case "kbo_date":  // 希望日参照
			var result = showModalDlg("../Sz/Sz0213.htm", null, 350, 260, left, top);
			break;
		case "matter1":
			var result = showModalDlg("../Sx/Sx1202.htm",null,600,400,left,top);
			break;
		case "matter2":
			var result = showModalDlg("../Sx/Sx1203.htm",null,350,260,left,top);
			break;
		case "matter3":
			var result = showModalDlg("../Sx/Sx1204.htm",null,350,260,left,top);
			break;
		case "matter4":
			var result = showModalDlg("../Sx/Sx1205.htm",null,350,260,left,top);
			break;
		case "ad_nsi_cd":
			var result = showModalDlg("../Sx/Sx0507.htm",null,350,260,left,top);
			break;
		case "adc_id":
			var result = showModalDlg("../Sx/Sx0404.htm",null,350,260,left,top);
			break;
			
		default:
			return null;
			
		return result;

	}
}
