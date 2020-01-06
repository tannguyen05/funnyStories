/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default class Saved extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => this.props.navigation.navigate("Home")}>
                    Saved
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    }
});
