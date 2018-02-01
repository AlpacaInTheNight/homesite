(function() {
	
	var html = document.getElementsByTagName("html")[0];
	
	var userAgent = navigator.userAgent;
	
	//var userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3";
		
	//var userAgent = "Mozilla/5.0 (Linux; U; Android 2.2;es-es;GT-I5500 Build/ FROYO) AppleWebKit/533.1 (KHTML, like Geccko) Version/4.0 Mobile Safari/533.1";
	
	//var userAgent = "Mozilla/5.0 (Linux; U; Android 4.1.2; es-mx; LG-P778 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
	
	
	//var userAgent : String = request.httpUserAgent;
	userAgent = userAgent.toLowerCase();
	
	/*
		Device Detection
	*/
	
	var isAndroid = userAgent.indexOf("android") >= 0;
	var isMobile = userAgent.indexOf("mobile") >= 0;
	var isApple = false;
	var deviceType = "desktop";
	
	/*
		We assume that there is no desktop android devices and
		without special tablet-keystring it's a mobile.
		Some mobile devices places android keyword, but don't place
		mobile or tablet keywords.
	*/
	if(isAndroid) {
		isMobile = true;
	}
	
	if(isMobile) {
		deviceType = "mobile";
	}
	
	function contains(arr, str) {
		for (var i in arr) {
			if(str.indexOf(arr[i]) >= 0) {
				return true;
			}
		}
		return false;
	}
	
	/*
		Key strings that identify device manufacturer or family.
		Some manufacturers don't place their mark on all of their device,
		so we need to check for device model (like gt-i** device is a Samsung smartphone).
	*/
	var brand = false;
	var brands = {
		iphone		: ["iphone"],
		ipad		: ["ipad"],
		ipod		: ["ipod"],
		macbook		: ["macbook"],
		samsung		: ["samsung", "sm-", "gt-"],
		htc			: ["htc"],
		lg			: ["lge", "lg-", "; lgm"],
		nokia		: ["nokia"],
		motorola	: ["motorola", "xt10", "xt15"],
		amazon		: ["amazon", "kindle", "silk/", "silk-a", "kfthwi", "kftt", "kfapw"],
		verizon		: ["verizon", "qmv7", "qtaq", "sch-"],
		blackberry	: ["blackberry", "playbook", "bb10", " rim "],
		google		: ["nexus"] //note: Some of Google Nexus smartphones are produced in cooperation with Samsung, HTC and Motorola and can be detected as one of this brands. If not detected as one of above, than it's Google own Nexus.
	}
	
	//desctop os
	var os = {
		windows		: ["windows"],
		openbsd		: ["openbsd"],
		sunos		: ["sunos"],
		linux		: ["linux", "x11"],
		macintosh	: ["macintosh", "mac_power"]
	}
	
	//check for brand/family
	for(var i in brands) {
		if ( contains(brands[i], userAgent) ) {
			brand = i;
			break;
		}
	}
	
	//chekcing for OS if not a specific device
	if(!brand) {
		for(var i in os) {
			if ( contains(os[i], userAgent) ) {
				brand = i;
				break;
			}
		}
	}
	
	/*
		It's become hard to distinguish tablets from smartphones as many manufacturers
		place "mobile" key string on both mobile and tablet devices. So we need to check
		tagret device models.
	*/
	var tablets = [
		"gt-p",		//Samsung galaxy tab 1, tab 2, tab 3
		"sm-t",		//Samsung galaxy tab 2, tab 3, tab 4, tab pro, tab s
		"ipad",		//Apple iPad
		"tablet",	//general tablet device
		"playbook"	//BlackBerry playbook
	];
	if ( contains(tablets, userAgent) || brand == "amazon") {
		isMobile = false;
		deviceType = "tablet";
	}
	
	//check for Apple production
	if(brand == "iphone" || brand == "ipad" || brand == "ipod" || brand == "macbook") {
		isApple = true;
	}

	var addClass = "";
	
	if(isApple) {
		addClass += "apple ";
	}	
	if(isAndroid) {
		addClass += "android ";
	}
	if(deviceType) {
		addClass += deviceType + " ";
	}
	if(brand) {
		addClass += brand;
	}
	
	//isTouchDevice by Simon East
	function is_touch_device() {
		return 'ontouchstart' in window        // works on most browsers 
			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
	};
	
	if(is_touch_device()) {
		addClass += " istouch";
	}

	//applying info to the html tag
	html.className = addClass;

})();