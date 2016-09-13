LivechatVideoCall = new (class LivechatVideoCall {
	constructor() {
		this.live = new ReactiveVar(false);
		this.calling = new ReactiveVar(false);
		this.roomName = '';
	}

	askPermissions(callback) {
		if (Meteor.isCordova) {
			cordova.plugins.diagnostic.requestCameraAuthorization(() => {
				console.log('requestCameraAuthorization ->', arguments);
				cordova.plugins.diagnostic.requestMicrophoneAuthorization(() => {
					console.log('requestMicrophoneAuthorization ->', arguments);
					callback(true);
				}, (error) => {
					console.error(error);
				});
			}, (error) => {
				console.error(error);
			});
		} else {
			return callback(true);
		}
	}

	request() {
		this.askPermissions((granted) => {
			if (granted) {
				this.calling.set(true);

				Meteor.call('livechat:startVideoCall', visitor.getRoom(true), (error, result) => {
					if (error) {
						return;
					}

					visitor.subscribeToRoom(result.roomId);

					// after get ok from server, start the chat
					this.start(result.domain, result.jitsiRoom);
				});
			}
		});
	}

	start(domain, room) {
		this.roomName = room;
		var files = [
			'/jitsi/run.js',
			'/jitsi/fix_ios.js',
			'/jitsi/config.js',
			'/jitsi/utils.js',
			'/jitsi/do_external_connect.js',
			'/jitsi/interface_config.js',
			'/jitsi/lib-jitsi-meet.js',
			'/jitsi/app.bundle.js',
		].reverse();

		Meteor.defer(() => {
			function consume() {
				var file = files.pop();
				if (!file) {
					return;
				}
				$.getScript(file)
					.done(function() {
						consume();
					})
					.fail(function( jqxhr, settings, exception, a ) {
						window.ex = exception;
						console.log(jqxhr, settings, exception, a);
					});
			}
			consume();
		});
	}

	finish() {
		this.live.set(false);
		this.calling.set(false);
		if (APP && APP.API && APP.API.dispose) {
			APP.API.dispose();
		}
	}

	isActive() {
		return this.live.get() || this.calling.get();
	}

	isLive() {
		return this.live.get();
	}

	getRoomName() {
		return this.roomName.toLowerCase();
	}
});
