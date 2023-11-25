
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import Icon, { Icons } from '../components/Icons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Home from '../Screens/Home';
import Settings from '../Screens/Settings';
import AddCustomer from '../Screens/AddCustomer';
import AllCustomers from '../Screens/AllCustomers';
import Payment from '../Screens/Payment';
// import Profile from '../../Screens/Profile/Profile';

const TabArr = [
    { route: 'Home', label: 'Home', icon: 'home', color: "blue", component: Home },
    { route: 'AllCustomers', label: 'AllCustomers', icon: 'users', color: "black", component: AllCustomers },
    { route: 'AddCustomer', label: 'AddCustomer', icon: 'plus', color: "black", component: AddCustomer },
    { route: 'Payment', label: 'Bills', icon: 'file', color: "blue", component: Payment },
    { route: 'Settings', label: 'Settings', icon: 'cog', color: "black", component: Settings },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -14 }, 1: { scale: 1.2, translateY: -7} }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}>
                <View style={styles.btn}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <FontAwesome5 name={item.icon} size={20} color={focused ? "#0c4890" : "black"} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={styles.text}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default function Parent() {
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,

            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    tabBar: {
        height: 60,
        position: 'absolute',
        borderRadius: 16,
        left:4,
        right:4
    },
    btn: {
        width: 40,
        height: 40,
        borderRadius: 25,
        // borderWidth: 4,
        // borderColor: "red",
        backgroundColor: "#e6f1ff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "red",
        borderRadius: 25,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: "black",
    }
})