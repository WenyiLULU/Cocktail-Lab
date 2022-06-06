const axios = require('axios');
const mongoose = require('mongoose');
const Cocktail = require("../../models/Cocktail.model.js");

require("../../db/index.js")

const basicCocktail = ["mojito", "margarita", "Long Island Tea", "Sex on the Beach","Winter Paloma","sangria"]

let apiUrl

function getCocktailByName(){
    basicCocktail.forEach(name=>{
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
        axios
        .get(apiUrl)
        .then(responseFromAPI => {
            let data = responseFromAPI.data.drinks[0]
            let {strDrink, strAlcoholic,strInstructions,strImageSource} = data
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
                ingredients: ingredients,
                steps :strInstructions,
                image : strImageSource
                })
                .then(newCocktail => console.log("Basic cocktail created", newCocktail))
                .catch(err => console.log("Error creating cocktails", err))
                
        })
        .catch(err => console.log('Error while getting the data: ', err));
    })
}
getCocktailByName()
