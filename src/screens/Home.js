/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import firebase from "react-native-firebase";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const rootRef = firebase.database();

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            numColumns: 2,
            margin: 5,
            limit: 10
        };
    }

    componentDidMount() {
        this.getStories(10);
    }

    getStories = limit => {
        rootRef
            .ref("stories/")
            .orderByChild("createAt")
            .limitToLast(limit)
            .on("value", snapshot => {
                let items = [];
                snapshot.forEach(child => {
                    const data = child.val();
                    console.log("data", data);
                    items.unshift({
                        key: child.key,
                        title: data.title,
                        content: data.content,
                        createAt: data.createAt,
                        category: data.category,
                        image_uri: data.image_uri,
                        source: data.source,
                        saved: data.saved
                    });
                });
                this.setState({ stories: items });
            });
    };
    getMore = () => {
        const { limit } = this.state;
        let num = limit + 10;
        this.getStories(num);
        this.setState({ limit: num });
    };

    renderItem = (item, index) => {
        const { numColumns, margin } = this.state;
        const itemWidth = (WIDTH - 2 * margin * numColumns) / numColumns;
        const itemHeight = HEIGHT / 2.5;
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate("Detail", { item })
                }
            >
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#c0c0c0",
                        width: itemWidth,
                        height: itemHeight,
                        borderRadius: 11,
                        margin: margin
                    }}
                >
                    <ImageBackground
                        style={{
                            width: itemWidth - 2,
                            height: itemHeight * 0.9
                        }}
                        imageStyle={{ borderRadius: 10 }}
                        source={{
                            uri: item.image_uri
                        }}
                    ></ImageBackground>
                    <Text
                        style={{ color: "gray", padding: 5 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        console.log(this.state.stories);
        return (
            <View style={styles.container}>
                {this.state.stories.length == 0 ? (
                    <Text
                        style={{
                            alignSelf: "center"
                        }}
                    >
                        ...
                    </Text>
                ) : (
                    <FlatList
                        data={this.state.stories}
                        renderItem={({ item, index }) =>
                            this.renderItem(item, index)
                        }
                        numColumns={this.state.numColumns}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => this.getMore()}
                        onEndReachedThreshold={0.1}
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
