LivechatVideoCall = new (class LivechatVideoCall {
	constructor() {
		this.live = new ReactiveVar(false);
		this.calling = new ReactiveVar(false);
	}

	request() {
		this.calling.set(true);
		Meteor.call('livechat:startVideoCall', visitor.getRoom(true), (error, result) => {
			if (error) {
				return;
			}
			console.log('error ->', error);
			console.log('result ->', result);

			visitor.subscribeToRoom(result.roomId);

			// after get ok from server, start the chat
			this.start(result.domain, result.jitsiRoom);
		});

	}

	start(domain, room) {
		Meteor.defer(() => {
			let interfaceConfig = {};
			// let interfaceConfig = { filmStripOnly: true };
			interfaceConfig['TOOLBAR_BUTTONS'] = '[""]';
			interfaceConfig['APP_NAME'] = '"Livechat"';

			this.api = new jitsiAPI(domain, room, $('.video-call').width(), $('.video-call').height(), $('.video-call .container').get(0), {}, interfaceConfig);

			this.live.set(true);

			// once the call is ok, shows toolbar buttons
			setTimeout(() => {

			}, 3000);

			let logListener = (what) => {
				console.log('Jitsi.addEventListener ->',what);
			}

			this.api.addEventListeners({
				incomingMessage() { logListener('incomingMessage'); },
				outgoingMessage() { logListener('outgoingMessage'); },
				displayNameChange() { logListener('displayNameChange'); },
				participantJoined() { logListener('participantJoined'); },
				participantLeft() { logListener('participantLeft'); },
				videoConferenceJoined() { logListener('videoConferenceJoined'); },
				videoConferenceLeft() { logListener('videoConferenceLeft'); },
			});
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
