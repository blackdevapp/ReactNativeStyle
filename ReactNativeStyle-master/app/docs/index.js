{/*
    
ICON gerators
yo rn-toolbox:assets --icon icon.png
yo rn-toolbox:assets --splash splash.png --ios
yo rn-toolbox:assets --splash splash.png --android        

"rnpm": {
    "assets": [
      "./app/assets/fonts",
      "./app/assets/images",
      "./app/assets/images/icons",
      "./app/assets/sounds"
    ]
}

NativeBase Eject
node node_modules/native-base/ejectTheme.js


Build iOS

react-native run-ios --device ZariPhone
react-native run-ios --device ZariPhone --configuration Release

release 

./gradlew clean
./gradlew assembleRelease

gradle properties:

android.disableResourceValidation=true
android.enableAapt2 = false

react-native-svg -> sdk version 26,25.0.2
adb install -r ./app/build/outputs/apk/release/app-release.apk
react-native run-android --variant=release


ANDROID
import com.facebook.react.modules.i18nmanager.I18nUtil;
I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
sharedI18nUtilInstance.forceRTL(this, true);
sharedI18nUtilInstance.allowRTL(this, true);

IOS
#import <React/RCTI18nUtil.h>
[[RCTI18nUtil sharedInstance] allowRTL:YES];
[[RCTI18nUtil sharedInstance] forceRTL:YES];

release ios
// jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

permissions IOS: 

<key>NSCameraUsageDescription</key>
	<string>Your message to user when the camera is accessed for the first time</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>Your message to user when the photo library is accessed for the first time</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Your message to user when the microphone is accessed for the first time</string>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
  <key>UIRequiredDeviceCapabilities</key>
  

sign android 

signingConfigs { 
  release { 

      storeFile file('my-release-key.keystore') 
      storePassword 'yourpassword' 
      keyAlias 'my-key-alias' 
      keyPassword 'yourpassword' 

  } 
  
  buildTypes {release {signingConfig signingConfigs.release}}

*/}