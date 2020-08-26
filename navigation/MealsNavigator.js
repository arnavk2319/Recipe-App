import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform, Text } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/colors';
import { enableScreens } from 'react-native-screens';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

enableScreens();


const defaultStackNavOptions = {
    defaultNavigationOptions : {
        headerStyle: {
            backgroundColor:Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle : {
            fontFamily : 'open-sans-bold'
        },
        headerBackTitleStyle : {
            fontFamily : 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
}

const MealsNavigator = createStackNavigator (
    {
        Categories: {
            screen : CategoriesScreen,
        },
        CategoryMeals : {
            screen : CategoryMealsScreen, 
        },
        MealDetails : MealDetailsScreen
    } , {
        defaultNavigationOptions :  defaultStackNavOptions
    }
);


const FavNavigator = createStackNavigator({
    Favorites : FavoritesScreen,
    MealDetails : MealDetailsScreen
}, {
    defaultStackNavOptions : defaultStackNavOptions
})


const tabScreenConfig = {
    Meals : {
        screen : MealsNavigator,
        navigationOptions : {
            tabBarIcon : (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel : Platform.OS === 'android' ? <Text style={{fontFamily : 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites : {
        screen : FavNavigator,
        navigationOptions : {
            tabBarLabel : 'Favorite Items',
            tabBarIcon : (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                },
            tabBarColor: Colors.accentColor,
            tabBarLabel : Platform.OS === 'android' ? <Text style={{fontFamily : 'open-sans-bold'}}>Meals</Text> : 'Favorites'
            }
        }
    }


const MealsFavTabNavigator = Platform.OS === 'android' ? 
createMaterialBottomTabNavigator(tabScreenConfig , {
    activeTintColor : Colors.accentColor,
    shifting : true
}) 
: createBottomTabNavigator (tabScreenConfig, {
    tabBarOptions : {
        labelStyle :{
            fontFamily: 'open-sans'
        },
        activeTintColor: Colors.accentColor
    }
});


const FiltersNavigator = createStackNavigator({
    Filters : FiltersScreen
},{
    defaultStackNavOptions : defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFavs : {
        screen : MealsFavTabNavigator,
        navigationOptions : {
            drawerLabel : 'Meals'
        }
    },
    Filters : FiltersNavigator
}, {
    contentOptions : {
        activeTintColor : Colors.accentColor,
        labelStyle : {
            fontFamily : 'open-sans-bold'
        }
    }
})


export default createAppContainer(MainNavigator);