# Caixa.POC

## iOS

- In order to run on ios, please execute ``meteor add-platform ios``
- Connect your ios device and run ``meteor run ios-device``  and open the project in xcode
- Don't convert to latest swift syntax! 
- Within "Build Settings" add/set:
    -  "Enable Bitcode" to ``no``
    -  "Runpath Search Paths" setting with value ``@executable_path/Frameworks``
    -   add this to Bridging-Header.h ``#import "Plugins/cordova-plugin-iosrtc/cordova-plugin-iosrtc-Bridging-Header.h"``
    - meteor run-device ios


## Android
- In order to run on android, please execute ``meteor add-platform android``
- Edit `AndroidManifest.xml` in `.meteor/local/cordova-build/platforms/android` and add:  
    ``  <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.RECORD_VIDEO" />
        <uses-permission android:name="android.permission.CAMERA" /> 
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    ``
- Connect your android device and run ``meteor run android-device``
