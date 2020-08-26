import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView,View, Image, Text, Button, StyleSheet} from  'react-native'; 
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Item } from 'react-navigation-header-buttons';
import HeaderComponent from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/mealsAction';

const ListItem = props => {
    return(
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals)

    const mealID = props.navigation.getParam('mealID');
    
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealID));
    
    const selectedMeal = availableMeals.find(meal => meal.id === mealID);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealID))
    },[dispatch, mealID])

    useEffect(() => {
    props.navigation.setParams({toggleFav : toggleFavoriteHandler})
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav : currentMealIsFavorite})
        }, [currentMealIsFavorite]);

    return(
        <ScrollView>
            <Image source={{uri : selectedMeal.imageUrl}} style={styles.image} />
            <View style = {styles.details}>
                <DefaultText>{selectedMeal.duration} m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
             <View>
                <Text>
                    {selectedMeal.title}
                </Text>
                <Button title="Go to Categories" onPress={() => {
                    props.navigation.popToTop();
                }}></Button>
            </View>
        </ScrollView>
    )
}

MealDetailsScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle : mealTitle,
        headerRight : 
        <HeaderButtons HeaderButtonComponent={HeaderComponent}>
            <Item title='Favorite' iconName= {isFavorite ? 'ios-star' : 'ios-star-outline'} onPress = {toggleFavorite} />
            {/* <Item title='Not-Favorite' iconName= 'ios-star-outline' onPress = {() => {console.log('mark as favorite!')}} /> */}
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height: 200
    },
    details : {
        flexDirection : 'row',
        padding : 15,
        justifyContent : 'space-around'
    },
    title : {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem : {
        marginVertical : 10,
        marginHorizontal: 20,
        borderColor : '#ccc',
        borderWidth: 1,
        padding: 10
    }
})

export default MealDetailsScreen;