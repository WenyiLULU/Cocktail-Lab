const axios = require('axios');
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Cocktail = require("../../models/Cocktail.model.js");

require("../../db/index.js")

let apiUrl

function getRandomCocktail(n){
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

    for(let i=0; i < n; i+=1){
        axios
        .get(apiUrl)
        .then(responseFromAPI => {
            let data = responseFromAPI.data.drinks[0]
            let {strDrink, strAlcoholic,strInstructions,strDrinkThumb} = data
            let ingredients = []
            for (let i=1; i<16; i+=1){
                if(data[`strIngredient${i}`]!== null){
                    ingredients.push({ingredient: data[`strIngredient${i}`], amount: data[`strMeasure${i}`]})
                }
            }
            //console.log('The response from API: ', data);
            //console.log(ingredients)
            Cocktail
                .create({
                name: strDrink,
                category: strAlcoholic,
                author: ObjectId("629f238547ff4da22e1c3dd1"),
                ingredients: ingredients,
                steps :strInstructions,
                image : strDrinkThumb
                })
                .then(newCocktail => console.log("Basic cocktail created", newCocktail))
                .catch(err => console.log("Error creating cocktails", err))
                
        })
        .catch(err => console.log('Error while getting the data: ', err));
    }    
}
getRandomCocktail(12)