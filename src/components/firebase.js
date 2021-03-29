import messaging from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
      await firebase.messaging().registerDeviceForRemoteMessages();
    }
  }
};

const getDeviceToken = async () => {
  let token = await firebase.messaging().getToken();
  return token
}

const handleForeground = async () => {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  messaging().onMessage(async remoteMessage => {
    // console.log(remoteMessage)
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data,
      android: {
        channelId,
      },
    });
  });

  await notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        // console.log('------onPressForeground', detail.notification)
        // if (detail.notification.data.type === 'PAHT') {
        //   this.props.updateNotificationAction({ "notifyId": detail.notification.data.notificationId })
        //   this.props.navigation.navigate("FeedbackDetailContainer", {
        //     type: "MyFeedback",
        //     id: detail.notification.data.id,
        //   })
        // }
        break;
      default:
        break;
    }
  })
}

const handleBackground = async () => {
  await messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log('------onPressBackground', remoteMessage)
    // if (remoteMessage.data.type === 'PAHT') {
    //   this.props.updateNotificationAction({ "notifyId": remoteMessage.data.notificationId })
    //   this.props.navigation.navigate("FeedbackDetailContainer", {
    //     type: "MyFeedback",
    //     id: remoteMessage.data.id,
    //   })
    // }
  });
}

const handleInitApp = async () => {
  await messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      // console.log('------onPressInitApp', remoteMessage)
      if (remoteMessage) {
        // if (remoteMessage.data.type === 'PAHT') {
        //   this.props.updateNotificationAction({ "notifyId": remoteMessage.data.notificationId })
        //   this.props.navigation.navigate("FeedbackDetailContainer", {
        //     type: "MyFeedback",
        //     id: remoteMessage.data.id,
        //   })
        // }
      }
    })
}

export {
  getDeviceToken,
  requestUserPermission,
  handleBackground,
  handleForeground,
  handleInitApp
}