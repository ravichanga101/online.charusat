function SetUpValidationRules(){$("#programs").rules("add",{required:!0,messages:{required:"Please select a program."}});$("#name").rules("add",{required:!0,messages:{required:"Please enter your full name."}});$("#email").rules("add",{required:!0,email:!0,messages:{required:"Please enter your email address.",email:"Please enter a valid email address."}});$("#state").rules("add",{validateselectedstate:!0});$("#city").rules("add",{validateselectedcity:!0});$("#phone").rules("add",{required:!0,minlength:13,maxlength:14,messages:{required:"Please enter a telephone number.",minlength:"At least 10 digits are required.",maxlength:"No more than 14 digits are required."}})}function ChangeValidationRulesForIndiaPhones(n,t,i){n=="in"?($(t).attr("maxlength",i),$(t).rules("remove","minlength"),$(t).rules("remove","maxlength"),$(t).rules("add",{minlength:i,maxlength:i,messages:{minlength:i+" digits are required.",maxlength:i+" digits are required."}})):($(t).attr("maxlength","14"),$(t).rules("remove","minlength"),$(t).rules("remove","maxlength"),$(t).rules("add",{minlength:10,maxlength:14,messages:{minlength:"At least 10 digits are required.",maxlength:"No more than 14 digits are required."}}))}function GetLeadData(){try{var n={},t=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;return urlPlusQS=t,n.LProgramCode=$("#programs").val(),n.FirstName=$("#name").val(),n.LastName=".",n.Email=$("#email").val(),n.Celular=$("#phone").val(),n.CountryCode=$("#txtphoneCountry").val(),n.Ciudad=$("#city").val(),n.StateId=$("#txtStateId").val(),n.CityId=$("#txtCityId").val(),n.WebUrl=urlPlusQS,n.Accion="save",n}catch(i){alert("Error in GetLeadData(): "+i)}}$(document).ready(function(){var n=$("#ContactForm").validate({highlight:function(n){$(n).addClass("fieldError")},unhighlight:function(n){$(n).removeClass("fieldError")}});$("#ContactForm").length!=0&&SetUpValidationRules();$("#phone").focus(function(){$(this).keydown(function(n){var t=$("#txtphoneCountry").prev().find(".iti__selected-flag").attr("title").split("+")[1].length+1,i;n.keyCode==46&&$(this).prop("selectionStart")>t-1||n.keyCode==8&&$(this).prop("selectionStart")>t||n.keyCode==9||n.keyCode==27||n.keyCode==13||n.keyCode==65&&n.ctrlKey===!0||n.keyCode>=35&&n.keyCode<=39||((n.shiftKey||(n.keyCode<48||n.keyCode>57)&&(n.keyCode<96||n.keyCode>105))&&n.preventDefault(),i=$(this).val().length,i>t+9&&n.preventDefault(),(n.keyCode===8&&$(this).prop("selectionStart")<=t||n.keyCode==46&&$(this).prop("selectionStart")<=t-1)&&n.preventDefault())});$(this).contextmenu(function(n){n.preventDefault()})});$("#requestInfo1").click(function(){var n=$("#requestInfo1").html(),t,i;if($("#requestInfo1").attr("disabled",!0),$("#requestInfo1").html('<div class="d-flex flex-row justify-content-center align-items-center"><p class="pe-2 m-0">Please wait<\/p><div class="spinner-border" role="status"><\/div ><\/div>'),$("#errMessage").hide(),t=$("#ContactForm").validate(),t.form()){if(i=GetLeadData(),i)try{$.ajax({type:"POST",url:"/ajax/savecontact",dataType:"json","async":!0,data:i}).done(function(t){t.status=="OK"?window.location.href=$("#landingPageSiguiente").length>0&&$("#landingPageSiguiente").val()!=""?$("#landingPageSiguiente").val():"/thank-you":($("#requestInfo1").attr("disabled",!1),$("#requestInfo1").html(n),$("#errMessage").show(),$("#errMessage").html("<strong>Error: <\/strong>"+t.description))}).fail(function(t,i,r){$("#requestInfo1").attr("disabled",!1);$("#requestInfo1").html(n);t.status!=200&&(response=r===""?"Failed to perform this operation.":r);$("#errMessage").show();$("#errMessage").html("<strong>Error: <\/strong>"+response)})}catch(r){$("#requestInfo1").attr("disabled",!1);$("#requestInfo1").html(n);alert("Unexpected error: "+r)}}else $("#requestInfo1").attr("disabled",!1),$("#requestInfo1").html(n),t.focusInvalid()});$("#state").autocomplete({source:function(n,t){$(".loader-state").show();$.ajax({url:"/ajax/getstatesbycountrycode",dataType:"json",data:{countryCode:$("#txtphoneCountry").val(),term:n.term,maxRows:15},success:function(n){if(n.length==0)n.push({id:"",label:"Not found",value:"Not found"});t(n)}}).done(function(){$(".loader-state").hide()})},minLength:3,select:function(n,t){t.item.value=="Not found"?n.preventDefault():($("#state").val(t.item.id),$("#state").attr("disabled",!0),$("#state").removeClass("fieldError"),$("#city").focus(),$("#txtStateId").val(t.item.id),$("#state").next().hasClass("alert-error")&&$("#state").next().remove())}});$("#city").autocomplete({source:function(n,t){$(".loader-city").show();$.ajax({url:"/ajax/getcitiesbystateid",dataType:"json",data:{stateId:$("#txtStateId").val(),term:n.term,maxRows:15},success:function(n){if(n.length==0)n.push({id:"",label:"Not found",value:"Not found"});t(n)}}).done(function(){$(".loader-city").hide()})},minLength:3,select:function(n,t){t.item.value=="Not found"?n.preventDefault():($("#city").val(t.item.id),$("#city").attr("disabled",!0),$("#city").removeClass("fieldError"),$("#phone").focus(),$("#txtCityId").val(t.item.id),$("#city").next().hasClass("alert-error")&&$("#city").next().remove())}});$("#btnCleanState").click(function(){$("#state").val("");$("#state").attr("disabled",!1);$("#state").focus();$("#txtStateId").val("");$("#city").val("");$("#city").attr("disabled",!1);$("#txtCityId").val("")});$("#btnCleanCity").click(function(){$("#city").val("");$("#city").attr("disabled",!1);$("#city").focus();$("#txtCityId").val("")});$("#chkPrivacyPolicy").click(function(){$("#chkPrivacyPolicy").is(":checked")?$("#requestInfo1").attr("disabled",!1):$("#requestInfo1").attr("disabled",!0)});$.validator.addMethod("validateselectedstate",function(n){return n!=""&&$("#txtStateId").val()!=""},"Please enter your state of residence.");$.validator.addMethod("validateselectedcity",function(n){return n!=""&&$("#txtCityId").val()!=""},"Please enter your city of residence.")});