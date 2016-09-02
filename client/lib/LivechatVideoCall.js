LivechatVideoCall = new (class LivechatVideoCall {
	constructor() {
		this.live = new ReactiveVar(false);
		this.calling = new ReactiveVar(false);
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
				$('.livechat-room').hide();
				this.calling.set(true);

				// this.start('jitsi.rocket.chat', 'RocketChatd55894fdc76834211cf8584c021e1f25');
				this.start('jitsi.rocket.chat', 'RocketChat2949ae2b4204f25693c34773f6d325d8');
				// Meteor.call('livechat:startVideoCall', visitor.getRoom(true), (error, result) => {
				// 	if (error) {
				// 		return;
				// 	}
				// 	visitor.subscribeToRoom(result.roomId);

				// 	// after get ok from server, start the chat
				// 	this.start(result.domain, result.jitsiRoom);
				// });
			}
		});
	}

	start(domain, room) {
		Meteor.defer(() => {
			$.getScript('/jitsi/config.js');
			$.getScript('/jitsi/utils.js');
			$.getScript('/jitsi/do_external_connect.js');
			$.getScript('/jitsi/interface_config.js');
			$.getScript('/jitsi/lib-jitsi-meet.min.js');
			$.getScript('/jitsi/app.bundle.min.js');


			// let interfaceConfig = {};
			// // let interfaceConfig = { filmStripOnly: true };
			// interfaceConfig['TOOLBAR_BUTTONS'] = '[""]';
			// interfaceConfig['APP_NAME'] = '"Livechat"';

			// this.api = new jitsiAPI(domain, room, $('.video-call').width(), $('.video-call').height(), $('.video-call .container').get(0), {}, interfaceConfig);

			// this.live.set(true);

			// let logListener = (what) => {
			// 	console.log('Jitsi.addEventListener ->',what);
			// }

			// this.api.addEventListeners({
			// 	incomingMessage() { logListener('incomingMessage'); },
			// 	outgoingMessage() { logListener('outgoingMessage'); },
			// 	displayNameChange() { logListener('displayNameChange'); },
			// 	participantJoined() { logListener('participantJoined'); },
			// 	participantLeft() { logListener('participantLeft'); },
			// 	videoConferenceJoined() { logListener('videoConferenceJoined'); },
			// 	videoConferenceLeft() { logListener('videoConferenceLeft'); },
			// });
		});
	}

	finish() {
		this.live.set(false);
		this.calling.set(false);
		this.api.dispose();
	}

	isActive() {
		return this.live.get() || this.calling.get();
	}

	isLive() {
		return this.live.get();
	}
});
