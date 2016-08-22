// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.caixa.poc.rocket.chat',
  name: 'Caixa POC',
  description: 'Caixa POC',
  author: 'Rocket.Chat',
  email: 'contact@rocket.chat',
  website: 'https://rocket.chat',
  version: '0.0.2'
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'assets/android-caixa-mdpi.png',
  'android_hdpi': 'assets/android-caixa-hdpi.png',
  'android_xhdpi': 'assets/android-caixa-xhdpi.png',
  'android_xxhdpi': 'assets/android-caixa-xxhdpi.png',
  'android_xxxhdpi': 'assets/android-caixa-xxxhdpi.png',
  // 'iphone_2x': 'icons/icon-60@2x.png',
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  'android_mdpi_portrait': 'assets/android-caixa-mdpi-portrait.png',
  'android_hdpi_portrait': 'assets/android-caixa-hdpi-portrait.png',
  'android_xhdpi_portrait': 'assets/android-caixa-xhdpi-portrait.png',
  // 'android_xxhdpi_portrait': 'assets/android-xxhdpi.png',
  'android_mdpi_landscape': 'assets/android-caixa-mdpi-landscape.png',
  'android_hdpi_landscape': 'assets/android-caixa-hdpi-landscape.png',
  'android_xhdpi_landscape': 'assets/android-caixa-xhdpi-landscape.png',
  // 'android_xxhdpi_landscape': 'assets/android-xxhdpi.png',
  // 'iphone_2x': 'splash/Default@2x~iphone.png',
  // ... more screen sizes and platforms ...
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffFFFFFF');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.accessRule('https://jitsi.rocket.chat/*', { type: 'navigation' } );
App.accessRule('https://meet.jit.si/*', { type: 'navigation' } );
App.accessRule('http://*');
App.accessRule('https://*');
App.accessRule('*');
App.accessRule('*://173.194.71.127:*');
App.accessRule('*5.9.154.226:*');
App.accessRule('*://localhost:*');
App.accessRule('*://192.168.192.251:*');

// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
