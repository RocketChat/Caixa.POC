jarsigner -digestalg SHA1 release-unsigned.apk caixa.poc
~/bin/android-sdk-linux/build-tools/24.0.1/zipalign 4 release-unsigned.apk release-signed.apk
