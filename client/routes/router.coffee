BlazeLayout.setRoot('body');

FlowRouter.route '/',
	name: 'index'

	triggersEnter: [
		->
			visitor.register()
	]

	action: ->
		BlazeLayout.render 'main', {center: 'livechatWindow'}
