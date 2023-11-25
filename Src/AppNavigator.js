import * as React from 'react';
import Parent from "./Normal/Parent";
import Splash from "./Normal/Splash";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chart from '../components/Chart';
import Login from "./Normal/Login";
import Signup from "./Normal/Signup"
import AddCustomer from './Screens/AddCustomer';
import AllCustomers from './Screens/AllCustomers';
import Payment from './Screens/Payment';
import CustomerProfile from './Normal/CustomerProfile';
import UserProfile from './Normal/UserProfile';
import FAQItem from './Screens/faqs';
import DailyData from './Screens/DailyData';
import Selectoptions from '../components/Selectoptions';
import Milkmanslist from '../components/Milkmanslist';
import MilkmanDetail from '../components/MilkmanDetail';
import Tabview from '../components/Tabview';
import Parent2 from './Normal/Parent2';
import InterestCalculator from '../components/Hishab';
import Following from '../components/Following';


const Stack = createNativeStackNavigator();


function App() {
   
    return (
        <NavigationContainer >
            <Stack.Navigator  initialRouteName='Splash'>

                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>

                <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
                <Stack.Screen name="Parent" component={Parent} options={{headerShown:false}}/>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name="AddCustomer" component={AddCustomer} options={{headerShown:false}}/>
                <Stack.Screen name="AllCustomers" component={AllCustomers} options={{headerShown:false}}/>
                <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}}/>
                <Stack.Screen name="CustomerProfile" component={CustomerProfile} options={{headerShown:false}}/>
                <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown:false}}/>
                <Stack.Screen name="FAQItem" component={FAQItem} options={{headerShown:false}}/>
                <Stack.Screen name="DailyData" component={DailyData} options={{headerShown:false}}/>
                <Stack.Screen name="Selectoptions" component={Selectoptions} options={{headerShown:false}}/>
                <Stack.Screen name="Milkmanslist" component={Milkmanslist} options={{headerShown:false}}/>
                <Stack.Screen name="MilkmanDetail" component={MilkmanDetail} options={{headerShown:false}}/>
                <Stack.Screen name="Tabview" component={Tabview} options={{headerShown:false}}/>
                <Stack.Screen name="Parent2" component={Parent2} options={{headerShown:false}}/>
                <Stack.Screen name="InterestCalculator" component={InterestCalculator} options={{headerShown:false}}/>
                <Stack.Screen name="Following" component={Following} options={{headerShown:false}}/>
                <Stack.Screen name='Chart' component={Chart}/>
            </Stack.Navigator>          
        </NavigationContainer>
    );
}

export default App;