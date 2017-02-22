// JavaScript Document
var editMode = {
    init: function() {
        editModule.edit(".edit-mode","modelType","modelId","#editModeId");
        editModule.reload();
    }
}

/*
$(function() {
	var gomeEdit = function() {
		this.init();
	};
    gomeEdit.prototype = {
        init:function(){
            var thiz = this;
            thiz.reload();
            thiz.floor();

        },
        floor:function(){
            var $floor_head = $(".edit-mode");
            $floor_head.hover(function(){
                var This =this;
                $(This).addClass("deit-floor-out");
                $(This).append(" <div class='deit-floor-area'></div>");
            },function(){
                var This =this;
                $(This).removeClass("deit-floor-out");
                $(This).children(".deit-floor-area").remove();
            });
            $floor_head.bind("click",function(){
                var This = this;
                var _this = this;
                var modelType = $(_this).attr("modelType");
                var _modelId = $(_this).attr("modelId");
                var modelId = _modelId.replace(/\,/gi, "");
                //alert("modelType:"+modelType+"-----modelId:"+modelId);
                if(modelType){
                    _this.SDUrl =  $("#editId").attr("editUrl") + "gcc/channel/channelPage_channelModelTypeModificationMain.do";
                }else{
                    _this.SDUrl =  $("#editId").attr("editUrl") + "gcc/channel/channelPage_channelMainLvlNext.do";
                }
                var url = _this.SDUrl + '?modelType=' + modelType + '&modelId=' + modelId;
                showModalDlg2(url, window, "850", "494","","","yes");

            });
        },
        reload:function(){
            $("body").append(" <div id='reload' class='reload-logo'>点我刷新页面</div>");
            $("#reload").bind("click",function(){
                $.ajax({
                    type: "get",
                    url: "/stage-web/pageTemplateClearCache.jsp",
                    cache: false,
                    success: function (data) {
                        if(data.result == "true"){
                            location.reload();
                        }

                    }
                });
            });

        }

	};
	new gomeEdit();
});
*/
