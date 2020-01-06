/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View } from "react-native";
import RootNavigation from "./src/navigator/RootNavigation";
import NotifyService from "./src/notification/NotifyService";

export default class App extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <RootNavigation />
                <NotifyService />
            </View>
        );
    }
}
