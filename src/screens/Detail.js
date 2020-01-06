/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
// import { convert } from "../js/convert";
import HTML from "react-native-render-html";

export default class Detail extends Component {
    render() {
        const { item } = this.props.navigation.state.params;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.headerText}>{item.title}</Text>
                {/* <Text style={{ paddingHorizontal: 20 }}>
                    {new Date(item.createAt)}
                </Text> */}
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.image_uri }}
                    />
                </View>
                <HTML
                    html={item.content}
                    containerStyle={styles.content}
                    baseFontStyle={{
                        fontFamily: "monospace",
                        fontSize: 20,
                        color: "#400040"
                    }}
                />
                <Text style={{ paddingHorizontal: 20 }}>{item.category}</Text>
                <Text style={styles.content}>
                    <Text style={{ fontWeight: "bold" }}>Nguồn:</Text>
                    {item.source}
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    headerText: {
        color: "#800040",
        fontSize: 30,
        fontFamily: "monospace",
        paddingHorizontal: 20,
        paddingVertical: 30,
        fontWeight: "bold"
    },
    image: {
        width: "90%",
        height: 250,
        alignSelf: "flex-end",
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50
    },
    imageContainer: {
        width: "92%",
        height: 250,
        alignSelf: "flex-end",
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: "#f4f4f4"
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 30
    }
});
