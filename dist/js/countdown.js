!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(h){var c=[],g=[],d={precision:100,elapse:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var f={Y:"years",m:"months",n:"daysToMonth",w:"weeks",d:"daysToWeek",D:"totalDays",H:"hours",M:"minutes",S:"seconds"};var b=function(j,i,e){this.el=j,this.$el=h(j),this.interval=null,this.offset={},this.options=h.extend({},d),this.instanceNumber=c.length,c.push(this),this.$el.data("countdown-instance",this.instanceNumber),e&&("function"==typeof e?(this.$el.on("update.countdown",e),this.$el.on("stoped.countdown",e),this.$el.on("finish.countdown",e)):this.options=h.extend({},d,e)),this.setFinalDate(i),this.start()};h.extend(b.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),c[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=function(e){if(e instanceof Date){return e}if(String(e).match(g)){return String(e).match(/^[0-9]*$/)&&(e=Number(e)),String(e).match(/\-/)&&(e=String(e).replace(/\-/g,"/")),new Date(e)}throw new Error("Couldn't cast `"+e+"` to a date object.")}(a)},update:function(){if(0!==this.$el.closest("html").length){var a,k=void 0!==h._data(this.el,"events"),j=new Date;a=this.finalDate.getTime()-j.getTime(),a=Math.ceil(a/1000),a=!this.options.elapse&&a<0?0:Math.abs(a),this.totalSecsLeft!==a&&k&&(this.totalSecsLeft=a,this.elapsed=j>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-j.getFullYear())},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))}else{this.remove()}},dispatchEvent:function(a){var k,j=h.Event(a+".countdown");j.finalDate=this.finalDate,j.elapsed=this.elapsed,j.offset=h.extend({},this.offset),j.strftime=(k=this.offset,function(E){var s,z,m,B,y,A,D=E.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(D){for(var n=0,w=D.length;n<w;++n){var F=D[n].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),C=(s=F[0],z=s.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),new RegExp(z)),q=F[1]||"",G=F[3]||"",x=null;F=F[2],f.hasOwnProperty(F)&&(x=f[F],x=Number(k[x])),null!==x&&("!"===q&&(B=x,y=void 0,A=void 0,y="s",A="",(m=G)&&(1===(m=m.replace(/(:|;|\s)/gi,"").split(/\,/)).length?y=m[0]:(A=m[0],y=m[1])),x=1===Math.abs(B)?A:y),""===q&&x<10&&(x="0"+x.toString()),E=E.replace(C,x.toString()))}}return E=E.replace(/%%/,"%")}),this.$el.trigger(j)}}),h.fn.countdown=function(){var a=Array.prototype.slice.call(arguments,0);return this.each(function(){var e=h(this).data("countdown-instance");if(void 0!==e){var j=c[e],k=a[0];b.prototype.hasOwnProperty(k)?j[k].apply(j,a.slice(1)):null===String(k).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(j.setFinalDate.call(j,k),j.start()):h.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,k))}else{new b(this,a[0],a[1])}})}});