// JavaScript Document
var editModule={
    edit:function(className,type,id,idName){
        var $floor_head = $(className);
        $floor_head.hover(function(){
            var This =this;
            $(This).addClass("deit-floor-out");
            if($('body').hasClass('.home')){
                var deitFloor=$(This).find("deit-floor-area");
                if(deitFloor.length<=0){
                    $(This).append(" <div class='deit-floor-area'></div>");
                }else{
                    console.log(deitFloor.length);
                };
            }else{
                $(This).append(" <div class='deit-floor-area'></div>");
            }
        },function(){
            var This =this;
            $(This).removeClass("deit-floor-out");
            $(This).children(".deit-floor-area").remove();
        });
        $floor_head.bind("click",function(){
            var This = this;
            var _this = this;
            //var modelType = $(_this).attr("modelType");
            //var _modelId = $(_this).attr("modelId");
            var modelType = $(_this).attr(type);
            var _modelId = $(_this).attr(id);
            var modelId = _modelId.replace(/\,/gi, "");
            //alert("modelType:"+modelType+"-----modelId:"+modelId);
            if(modelType){
                _this.SDUrl =  $(idName).attr("editUrl") + "gcc/channel/channelPage_channelModelTypeModificationMain.do";
            }else{
                _this.SDUrl =  $(idName).attr("editUrl") + "gcc/channel/channelPage_channelMainLvlNext.do";
            }
            var url = _this.SDUrl + '?modelType=' + modelType + '&modelId=' + modelId;
            showModalDlg2(url, window, "850", "494","","","yes");
        });
    },
    reload:function (){
        $("body").append(" <div id='reload' class='reload-logo'>刷新页面</div>");
        $("#reload").bind("click",function(){
            $.ajax({
                type: "get",
                url: "/stage-web/pageTemplateClearCache.jsp",
                cache: false,
                success: function (data) {
                    data  = $.parseJSON(data);
                    if(data.result == "true"){
                        location.reload();
                    }

                }
            });
        });
    }
 }