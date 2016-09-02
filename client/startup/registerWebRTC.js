if (Meteor.isCordova) {
	console.log('isCordova');
	document.addEventListener('deviceready', function () {
		// Just for iOS devices.
		console.log('platform ->', window.device.platform);
		if (window.device.platform === 'iOS') {
			cordova.plugins.iosrtc.registerGlobals();
		}
	});
}
