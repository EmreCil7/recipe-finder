document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('recipes-container').style.display = 'none';
    document.getElementById('recipes-list').innerHTML = '';
});

function fetchRecipes(ingredients) {
    const recipesList = document.getElementById('recipes-list');
    recipesList.innerHTML = 'Loading recipes...';

    const apiKey = '62dbe012ad8a4cf6ae7ff58a44eb0323';
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            recipesList.innerHTML = '';
            if (data.length === 0) {
                recipesList.innerHTML = '<p>No recipes found.</p>';
            } else {
                data.forEach(recipe => {
                    const recipeItem = document.createElement('div');
                    recipeItem.classList.add('recipe-item');
                    recipeItem.innerHTML = `
                        <h3>${recipe.title}</h3>
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <button class="details-button" onclick="toggleRecipeDetails(${recipe.id})">Get Recipe Details</button>
                        <div class="details" id="details-${recipe.id}" style="display: none;">
                            <h4>Missing Ingredients:</h4>
                            <ul>${recipe.missedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}</ul>
                        </div>
                    `;
                    recipesList.appendChild(recipeItem);
                });
            }
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('recipes-container').style.display = 'block';
        })
        .catch(error => {
            recipesList.innerHTML = '<p>There was an error fetching the recipes. Please try again.</p>';
            console.error('Error fetching recipes:', error);
        });
}

function toggleRecipeDetails(recipeId) {
    const detailsDiv = document.getElementById(`details-${recipeId}`);
    if (detailsDiv.style.display === 'none') {
        fetchRecipeDetails(recipeId);
    } else {
        detailsDiv.style.display = 'none';
        detailsDiv.innerHTML = `
            <h4>Missing Ingredients:</h4>
            <ul>${detailsDiv.querySelector('ul').innerHTML}</ul>
        `;
    }
}

function fetchRecipeDetails(recipeId) {
    const apiKey = '62dbe012ad8a4cf6ae7ff58a44eb0323';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const detailsDiv = document.getElementById(`details-${recipeId}`);
            detailsDiv.innerHTML += `
                <h4>Instructions:</h4>
                <p>${data.instructions}</p>
            `;
            detailsDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}

