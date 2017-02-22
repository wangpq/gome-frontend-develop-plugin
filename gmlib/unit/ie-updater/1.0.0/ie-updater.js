var ie6html = "<div><i class='gm-icon'>&#x00A8;</i>国美在线已升级至更高版本，不再支持ie6浏览器。为保障账户安全，建议您 <b>使用更高版本ie浏览器</b> 或 <b>下载手机国美APP。</b></div>";
var ie6css ="#ie6-tips{height:40px;background:#ffff93;overflow:hidden}\
#ie6-tips div{width:990px;margin:0 auto;font:12px/40px 'arial','nsimsun';color:#555;text-align:center}\
#ie6-tips a{font-weight:700;color:#555}\
#ie6-tips a:hover{text-decoration:none;color:#e3101e;}\
#ie6-tips b{font-weight:700}\
#ie6-tips i{margin:0 10px 0 0;font-size:16px;}";
var doc  = document,
    head = doc.getElementsByTagName('head')[0],
    body = doc.body;

    // insert css,
    var style = doc.createElement('style');
    style.setAttribute('type', 'text/css');
    if(style.styleSheet){// IE
        style.styleSheet.cssText = ie6css;
    } else {// w3c
        var cssText = doc.createTextNode(ie6css);
        style.appendChild(cssText);
    }
    head.appendChild(style);

    // insert html
    var tips=doc.createElement("div")
    tips.id="ie6-tips";
    tips.innerHTML=ie6html;
    body.insertBefore(tips, body.firstChild);