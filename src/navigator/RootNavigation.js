import React from "react";
import {
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from "react-navigation";
import Home from "../screens/Home";
import Saved from "../screens/Saved";
import Categories from "../screens/Categories";
import Search from "../screens/Search";
import PhoneAuth from "../screens/PhoneAuth";
import Splash from "../screens/Splash";
import Detail from "../screens/Detail";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Trang chủ",
            headerTitleStyle: {
                color: "tomato"
            }
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {}
    }
});

const CategoryStack = createStackNavigator({
    Categories: {
        screen: Categories,
        navigationOptions: {
            title: "Thể loại",
            headerTitleStyle: {
                color: "tomato"
            }
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {}
    }
});

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

CategoryStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" size={25} color={tintColor} />
                )
            }
        },
        Categories: {
            screen: CategoryStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="layers" size={25} color={tintColor} />
                )
            }
        },
        Saved: {
            screen: Saved,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="heart" size={25} color={tintColor} />
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="magnifier" size={25} color={tintColor} />
                )
            }
        },
        PhoneAuth: {
            screen: PhoneAuth,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="settings" size={25} color={tintColor} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            showLabel: false
        },
        animationEnabled: true,
        swipeEnabled: true
    }
);
const RootSwitch = createSwitchNavigator(
    { Splash, TabNavigator },
    { initialRouteName: "TabNavigator" }
);
export default createAppContainer(RootSwitch);
