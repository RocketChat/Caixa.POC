Template.register.helpers({
	error() {
		return Template.instance().error.get();
	},
	welcomeMessage() {
		return '';
	},
	hasDepartments() {
		return Department.find().count() > 1;
	},
	departments() {
		return Department.find();
	},
	loggedIn() {
		return !!Meteor.userId();
	}
});

Template.register.events({
	'submit #livechat-registration'(e, instance) {
		e.preventDefault();
		if (Meteor.userId()) {
			Livechat.registrationForm = false;
			return;
		}

		var $email, $name;
		$name = instance.$('input[name=name]');
		// $email = instance.$('input[name=email]');
		if (!$name.val().trim()) {
			return instance.showError(TAPi18n.__('Please_fill_name_and_email'));
		} else {
			var departmentId = instance.$('select[name=department]').val();
			if (!departmentId) {
				var department = Department.findOne();
				if (department) {
					departmentId = department._id;
				}
			}

			var guest = {
				token: visitor.getToken(),
				name: $name.val(),
				email: 'livechat+' + Random.id() + '@rocket.chat',
				department: departmentId
			};
			Meteor.call('livechat:registerGuest', guest, function(error, result) {
				if (error != null) {
					return instance.showError(error.reason);
				}
				Meteor.loginWithToken(result.token, function(error) {
					if (error) {
						return instance.showError(error.reason);
					}
					Livechat.registrationForm = false;
				});
			});
		}
	},
	'click .error'(e, instance) {
		return instance.hideError();
	}
});

Template.register.onCreated(function() {
	this.error = new ReactiveVar();
	this.showError = (msg) => {
		$('.error').addClass('show');
		this.error.set(msg);
	};
	this.hideError = () => {
		$('.error').removeClass('show');
		this.error.set();
	};
});
