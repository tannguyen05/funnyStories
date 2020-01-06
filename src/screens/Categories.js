/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import { categories } from "../data/category";
import firebase from "react-native-firebase";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const rootRef = firebase.database();

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        rootRef
            .ref("categories/")
            .orderByKey()
            .on("value", snapshot => {
                let items = [];
                snapshot.forEach(child => {
                    const data = child.val();
                    items.push({
                        key: child.key,
                        title: data.title,
                        slug: data.slug,
                        image_uri: data.image_uri
                    });
                });
                this.setState({ categories: items });
            });
    };
    renderItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{
                    width: WIDTH - 10,
                    height: HEIGHT / 4,
                    borderRadius: 10,
                    margin: 5
                }}
                onPress={() => this.props.navigation.navigate("")}
            >
                <ImageBackground
                    style={{
                        width: WIDTH - 10,
                        height: HEIGHT / 4,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    imageStyle={{ borderRadius: 10 }}
                    source={{
                        uri: item.image_uri
                    }}
                >
                    <Text
                        style={{
                            color: "red",
                            fontSize: 25,
                            fontWeight: "bold"
                        }}
                    >
                        {item.title}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                {this.state.categories.length == 0 ? (
                    <Text
                        style={{
                            alignSelf: "center"
                        }}
                    >
                        Không có kết nối...
                    </Text>
                ) : (
                    <FlatList
                        data={this.state.categories}
                        renderItem={({ item, index }) =>
                            this.renderItem(item, index)
                        }
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
});
