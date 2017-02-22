var tempnav = '\
<div class="category">\
	<dl>\
		<%\
		for(var i=0;i<catlog.length;i++){\
			var cats = catlog[i].cats;\
			var subc = catlog[i].subCates;\
		%>\
		<dt>\
		<% if(cats.ctype){ %>\
				<a rel="nofollow" href="<%= cats.href %>" title="<%= cats.title %>" target="_blank"><%= cats.title %></a>\
		<% }else{ %>\
				<%= cats.title %>\
		<% } %>\
		</dt>\
		<% \
			var child = "";\
			if(cats.csize-1 == i){\
				child = "class=\'childfslast\'";\
			}\
		%>\
		<dd <%= child %> >\
			<% for(var j=0; j<subc.length; j++){ \
				var sbc = subc[j];\
				var cls = "";\
				if(sbc.cls!=""){cls=sbc.cls;}\
				if(sbc.tv){\
			%>\
				<a href="<%= sbc.href %>" title="<%= sbc.title %>" target="_blank" class="<%= sbc.cls %> cdj-a"><%= sbc.title %><img src="<%= sbc.img %>" class="cdj-img" /></a>\
			<%\
				}else{\
			%>\
				<a href="<%= sbc.href %>" title="<%= sbc.title %>" target="_blank" class="<%= sbc.cls %> <%if (sbc.mark=="hot" || sbc.mark=="Hot" || sbc.mark=="HOT") {%>subcategory-hot<%}%>"><%= sbc.title %></a>\
			<%\
				}\
			}\
			%>\
		</dd>\
		<% } %>\
	</dl>\
</div>\
<% if(brand.btype){\
	var bcat = brand.bcat;\
%>\
	<div class="relatedads">\
		<h4>推荐品牌</h4>\
		<div class="brand clearfix">\
			<%\
			var _k = bcat.length;\
			if(_k>15){_k=15;}\
			for(var j=0;j<_k;j++){\
				var bct = bcat[j];\
			%>\
				<a rel="nofollow" title="<%= bct.title %>" href="<%= bct.href %>" target="_blank"><%= bct.title %></a>\
			<% } %>\
		</div>\
	</div>\
	<% \
	if(brand.bimg.href!=undefined){ \
		var bmg = brand.bimg;\
	%>\
	<a rel="nofollow" class="cxpic" href="<%= bmg.href %>" title="<%= bmg.alt %>" target="_blank"><img src="<%= bmg.src %>" alt="<%= bmg.alt %>"/></a>\
<%\
	}\
}\
%>\
<a class="closegsidenav" href="javascript:;"></a>';