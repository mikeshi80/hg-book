(function($){$.fn.ajaxSubmit=function(_2){if(typeof _2=="function"){_2={success:_2};}_2=$.extend({url:this.attr("action")||window.location,type:this.attr("method")||"GET"},_2||{});var _3={};$.event.trigger("form.pre.serialize",[this,_2,_3]);if(_3.veto){return this;}var a=this.formToArray(_2.semantic);if(_2.data){for(var n in _2.data){a.push({name:n,value:_2.data[n]});}}if(_2.beforeSubmit&&_2.beforeSubmit(a,this,_2)===false){return this;}$.event.trigger("form.submit.validate",[a,this,_2,_3]);if(_3.veto){return this;}var q=$.param(a);if(_2.type.toUpperCase()=="GET"){_2.url+=(_2.url.indexOf("?")>=0?"&":"?")+q;_2.data=null;}else{_2.data=q;}var _7=this,callbacks=[];if(_2.resetForm){callbacks.push(function(){_7.resetForm();});}if(_2.clearForm){callbacks.push(function(){_7.clearForm();});}if(!_2.dataType&&_2.target){var _8=_2.success||function(){};callbacks.push(function(_9){if(this.evalScripts){$(_2.target).attr("innerHTML",_9).evalScripts().each(_8,arguments);}else{$(_2.target).html(_9).each(_8,arguments);}});}else{if(_2.success){callbacks.push(_2.success);}}_2.success=function(_a,_b){for(var i=0,max=callbacks.length;i<max;i++){callbacks[i](_a,_b,_7);}};var _d=$("input:file",this).fieldValue();var _e=false;for(var j=0;j<_d.length;j++){if(_d[j]){_e=true;}}if(_2.iframe||_e){fileUpload();}else{$.ajax(_2);}$.event.trigger("form.submit.notify",[this,_2]);return this;function fileUpload(){var _10=_7[0];var _11=$.extend({},$.ajaxSettings,_2);var id="jqFormIO"+$.fn.ajaxSubmit.counter++;var $io=$("<iframe id=\""+id+"\" name=\""+id+"\" />");var io=$io[0];var op8=$.browser.opera&&window.opera.version()<9;if($.browser.msie||op8){io.src="javascript:false;document.write(\"\");";}$io.css({position:"absolute",top:"-1000px",left:"-1000px"});var xhr={responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){}};var g=_11.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}if(g){$.event.trigger("ajaxSend",[xhr,_11]);}var _18=0;var _19=0;setTimeout(function(){$io.appendTo("body");io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,false);var _1a=_10.encoding?"encoding":"enctype";var t=_7.attr("target");_7.attr({target:id,method:"POST",action:_11.url});_10[_1a]="multipart/form-data";if(_11.timeout){setTimeout(function(){_19=true;cb();},_11.timeout);}_10.submit();_7.attr("target",t);},10);function cb(){if(_18++){return;}io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,false);var ok=true;try{if(_19){throw "timeout";}var _1d,doc;doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;xhr.responseText=doc.body?doc.body.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(_11.dataType=="json"||_11.dataType=="script"){var ta=doc.getElementsByTagName("textarea")[0];_1d=ta?ta.value:xhr.responseText;if(_11.dataType=="json"){eval("data = "+_1d);}else{$.globalEval(_1d);}}else{if(_11.dataType=="xml"){_1d=xhr.responseXML;if(!_1d&&xhr.responseText!=null){_1d=toXml(xhr.responseText);}}else{_1d=xhr.responseText;}}}catch(e){ok=false;$.handleError(_11,xhr,"error",e);}if(ok){_11.success(_1d,"success");if(g){$.event.trigger("ajaxSuccess",[xhr,_11]);}}if(g){$.event.trigger("ajaxComplete",[xhr,_11]);}if(g&&!--$.active){$.event.trigger("ajaxStop");}if(_11.complete){_11.complete(xhr,ok?"success":"error");}setTimeout(function(){$io.remove();xhr.responseXML=null;},100);}function toXml(s,doc){if(window.ActiveXObject){doc=new ActiveXObject("Microsoft.XMLDOM");doc.async="false";doc.loadXML(s);}else{doc=(new DOMParser()).parseFromString(s,"text/xml");}return (doc&&doc.documentElement&&doc.documentElement.tagName!="parsererror")?doc:null;}}};$.fn.ajaxSubmit.counter=0;$.fn.ajaxForm=function(_21){return this.ajaxFormUnbind().submit(submitHandler).each(function(){this.formPluginId=$.fn.ajaxForm.counter++;$.fn.ajaxForm.optionHash[this.formPluginId]=_21;$(":submit,input:image",this).click(clickHandler);});};$.fn.ajaxForm.counter=1;$.fn.ajaxForm.optionHash={};function clickHandler(e){var _23=this.form;_23.clk=this;if(this.type=="image"){if(e.offsetX!=undefined){_23.clk_x=e.offsetX;_23.clk_y=e.offsetY;}else{if(typeof $.fn.offset=="function"){var _24=$(this).offset();_23.clk_x=e.pageX-_24.left;_23.clk_y=e.pageY-_24.top;}else{_23.clk_x=e.pageX-this.offsetLeft;_23.clk_y=e.pageY-this.offsetTop;}}}setTimeout(function(){_23.clk=_23.clk_x=_23.clk_y=null;},10);}function submitHandler(){var id=this.formPluginId;var _26=$.fn.ajaxForm.optionHash[id];$(this).ajaxSubmit(_26);return false;}$.fn.ajaxFormUnbind=function(){this.unbind("submit",submitHandler);return this.each(function(){$(":submit,input:image",this).unbind("click",clickHandler);});};$.fn.formToArray=function(_27){var a=[];if(this.length==0){return a;}var _29=this[0];var els=_27?_29.getElementsByTagName("*"):_29.elements;if(!els){return a;}for(var i=0,max=els.length;i<max;i++){var el=els[i];var n=el.name;if(!n){continue;}if(_27&&_29.clk&&el.type=="image"){if(!el.disabled&&_29.clk==el){a.push({name:n+".x",value:_29.clk_x},{name:n+".y",value:_29.clk_y});}continue;}var v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(var j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}else{if(v!==null&&typeof v!="undefined"){a.push({name:n,value:v});}}}if(!_27&&_29.clk){var _30=_29.getElementsByTagName("input");for(var i=0,max=_30.length;i<max;i++){var _32=_30[i];var n=_32.name;if(n&&!_32.disabled&&_32.type=="image"&&_29.clk==_32){a.push({name:n+".x",value:_29.clk_x},{name:n+".y",value:_29.clk_y});}}}return a;};$.fn.formSerialize=function(_34){return $.param(this.formToArray(_34));};$.fn.fieldSerialize=function(_35){var a=[];this.each(function(){var n=this.name;if(!n){return;}var v=$.fieldValue(this,_35);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}else{if(v!==null&&typeof v!="undefined"){a.push({name:this.name,value:v});}}});return $.param(a);};$.fn.fieldValue=function(_3a){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,_3a);if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){continue;}v.constructor==Array?$.merge(val,v):val.push(v);}return val;};$.fieldValue=function(el,_3f){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(typeof _3f=="undefined"){_3f=true;}if(_3f&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){return null;}if(tag=="select"){var _41=el.selectedIndex;if(_41<0){return null;}var a=[],ops=el.options;var one=(t=="select-one");var max=(one?_41+1:ops.length);for(var i=(one?_41:0);i<max;i++){var op=ops[i];if(op.selected){var v=$.browser.msie&&!(op.attributes["value"].specified)?op.text:op.value;if(one){return v;}a.push(v);}}return a;}return el.value;};$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(t=="text"||t=="password"||tag=="textarea"){this.value="";}else{if(t=="checkbox"||t=="radio"){this.checked=false;}else{if(tag=="select"){this.selectedIndex=-1;}}}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset();}});};})(jQuery);