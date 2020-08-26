import React from 'react';
import { View,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaulText from '../components/DefaultText';

const CategoryMealsScreen = props => {
    const catID = props.navigation.getParam('categoryId')
    
    const filteredMeals = useSelector(state => state.meals.filteredMeals) 

    const displayedMeals = filteredMeals.filter(meal => meal.categoryIds.indexOf(catID) >= 0)

    if(displayedMeals.length === 0){
        return (
            <View style={styles.content}>
                <DefaulText>No meals found! Please check your filters.</DefaulText>
            </View>
        )
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation}/>
    )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catID = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    content : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})


export default CategoryMealsScreen;