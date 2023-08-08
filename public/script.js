document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const recipeContainer = document.querySelector(".recipe-container");

    searchButton.addEventListener("click", function () {
        const ingredient1 = document.getElementById("ingredient1").value;
        const ingredient2 = document.getElementById("ingredient2").value;
        const ingredient3 = document.getElementById("ingredient3").value;

        // Perform validation on ingredients here

        // If ingredients are valid, fetch and display recipes
        if (ingredient1 && ingredient2 && ingredient3) {
            fetch(`/search?ingredient1=${ingredient1}&ingredient2=${ingredient2}&ingredient3=${ingredient3}`)
                .then(response => response.json())
                .then(data => displayRecipes(data.recipes));
        }
    });

    
    function displayRecipes(recipes) {
        const recipeHtml = recipes.map(recipe => `
            <div class="recipe-card">
                <h2>${recipe.name}</h2>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Directions: ${recipe.directions}</p>
            </div>
        `).join("");

        recipeContainer.innerHTML = recipeHtml;
        recipeContainer.style.display = "block"; // Display the recipe container
    }
});