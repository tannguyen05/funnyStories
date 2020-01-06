import React, { Component } from "react";
import firebase from "react-native-firebase";
import { Platform, Alert } from "react-native";

export default class NotifyService extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        this.notificationDisplayedListener();
        this.messageListener();
    }

    createNotificationListeners = async () => {
        this.createChannel();
        /*
         * Triggered when a particular notification has been received in foreground
         * */
        // app in foreground
        this.notificationDisplayedListener = firebase
            .notifications()
            .onNotificationDisplayed(notification => {
                console.log("onNotificationDisplayed");
                console.log(notification);
                this.displayNotification(notification);
            });
        this.notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                console.log("notificationListener -> ", notification);

                const { title, body } = notification;
                // this.showAlert(title, body);
                this.displayNotification(notification);
            });

        /*
         * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         * */
        this.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened(notificationOpen => {
                const notification = notificationOpen.notification;
                console.log(
                    "onNotificationOpened - notification",
                    notification
                );
                console.log("onNotificationOpened - data", notification.data);
            });

        /*
         * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         * */
        const notificationOpen = await firebase
            .notifications()
            .getInitialNotification();
        if (notificationOpen) {
            const notification = notificationOpen.notification;
            console.log("getInitialNotification - notification", notification);
            console.log("getInitialNotification - data", notification.data);
        }
        /*
         * Triggered for data only payload in foreground
         * */
        this.messageListener = firebase.messaging().onMessage(message => {
            //process data message
            console.log("messageListener", JSON.stringify(message));
        });
    };

    displayNotification = notification => {
        if (Platform.OS === "android") {
            const localNotification = new firebase.notifications.Notification({
                sound: "default",
                show_in_foreground: true,
                show_in_background: true
            })
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId("funny") // e.g. the id you chose above
                .android.setSmallIcon("ic_launcher") // create this icon in Android Studio
                // .android.setColor(colors.colorAccent) // you can set a color here
                .android.setPriority(
                    firebase.notifications.Android.Priority.High
                );

            firebase
                .notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
        }
    };

    showAlert = (title, body) => {
        Alert.alert(
            title,
            body,
            [
                {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                }
            ],
            { cancelable: false }
        );
    };

    createChannel = () => {
        const channel = new firebase.notifications.Android.Channel(
            "funny",
            "Test Channel",
            firebase.notifications.Android.Importance.Max
        ).setDescription("My apps test channel");

        // Create the channel
        firebase.notifications().android.createChannel(channel);
    };

    //1
    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    };

    getToken = async () => {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log("fcmToken", fcmToken);
        }
    };

    requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log("permission rejected");
        }
    };

    render() {
        return null;
    }
}
