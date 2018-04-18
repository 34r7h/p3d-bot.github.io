function getTime(){
  var offset = -4;
  return "Exchange Time: " + new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
}

function getCookie(name) {
  		var dc = document.cookie;
  		var prefix = name + "=";
  		var begin = dc.indexOf("; " + prefix);

	if (begin == -1) {
      		begin = dc.indexOf(prefix);
      		if (begin != 0) return null;
  		}
  		else
  		{
      		begin += 2;
      		var end = document.cookie.indexOf(";", begin);
      		if (end == -1) {
      		end = dc.length;
      	}
  		}

	return decodeURI(dc.substring(begin + prefix.length, end));
}

window.addEventListener('load', function() {
  document.getElementById("date").innerHTML=getTime();
})

var url_string = window.location.href;
var url = new URL(url_string);
var theCookie = "maker=" + url.searchParams.get("maker");

if (url.searchParams.get("maker") !== null) {
	var toSet = "maker=" + url.searchParams.get("maker");
	document.cookie=theCookie;
} else {

	var refCookie = getCookie("maker");

	if (refCookie === null) {
		console.log("Ref cookie was null. Setting to default.");
		document.cookie = "maker=0x0000000000000000000000000000000000000000";
	} else {
		// do nothing if the cookie is already set and there is no new mnode link
	}
}

function whenAvailable(name, callback) {
  var interval = 10;
  window.setTimeout(function() {
    if (window[name]) {
      callback(window[name]);
    } else {
      window.setTimeout(arguments.callee, interval);
    }
  }, interval);
}

whenAvailable("web3js", function(){
  if (web3js.eth.accounts[0] !== null) {
    var element = "<a href='https://crystalball.mx/?maker="+ currentAddress + "'>https://crystalball.mx/?maker=" + currentAddress + "</a>";
    $("#quoteDisplay").append(element);
  }
});
