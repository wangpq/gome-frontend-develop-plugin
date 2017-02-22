/**
 * [大数据埋码拼接]
 * @Author   Silence
 * @QQ       82568873
 * @Mail     shixiaoqiang@yolo24.com
 * @DateTime 2016-03-30T17:55:09+0800
 */
$(function(){
	//data-page begin
	if(!$('body').attr('data-page')){
		var pageURL = window.location.href.match(/https?:\/\/(.*?)(?=\.|:)/);
		$('body').attr('data-page',pageURL[1]);
	}
	//data-code begin
	$(document).on('mousedown keydown','[data-code]',function(){
		var bodyCode = $('body').data('page');
		var aCode = $(this).data('code');
		var link = $(this).attr('href');
		var cmp = /(intcmp=[^&]+?)(&|$)/i;
		if (link==null || link=='' || (link.substring(0,4)!=='http' && link.substring(0,2)!=='//') ){
			return;
		}else if (link.indexOf('#') > -1 && link.indexOf('?') > -1){
			mao = link.substring(link.indexOf('#'));
			link = link.substring(0,link.indexOf('#')).replace(cmp,'');
			if(link.substring(link.indexOf('?')+1)==''){
				$(this).attr('href',link.substring(0,link.indexOf('?'))+'?intcmp='+bodyCode+'-'+aCode+mao);
			}else{
				$(this).attr('href',link.substring(0,link.indexOf('?'))+'?intcmp='+bodyCode+'-'+aCode+'&'+link.substring(link.indexOf('?')+1)+mao);
			};
		}else if (link.indexOf('#') > -1){
			$(this).attr('href',link.substring(0,link.indexOf('#'))+'?intcmp='+bodyCode+'-'+aCode+link.substring(link.indexOf('#')));
		}else if (link.indexOf('?') > -1){
			link = link.replace(cmp,'');
			if(link.substring(link.indexOf('?')+1)==''){
				$(this).attr('href',link.substring(0,link.indexOf('?'))+'?intcmp='+bodyCode+'-'+aCode);				
			}else{
				$(this).attr('href',link.substring(0,link.indexOf('?'))+'?intcmp='+bodyCode+'-'+aCode+'&'+link.substring(link.indexOf('?')+1));
			};
		}else{
			$(this).attr('href',link+'?intcmp='+bodyCode+'-'+aCode);
		};
	});
});