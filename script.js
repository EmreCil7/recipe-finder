// Function to get recipes based on ingredients
async function findRecipes() {
    // Show an alert to indicate that the function has been activated
    

    const ingredients = document.getElementById('ingredients').value.trim();
    const apiKey = '62dbe012ad8a4cf6ae7ff58a44eb0323'; // Replace with your Spoonacular API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        displayRecipes(response.data);
        // Show the Back to Home button
        document.getElementById('backButton').style.display = 'inline';
        console.log('Recipes found:', response.data); // Log recipes data for debugging
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Used ingredients: ${recipe.usedIngredients.map(i => i.name).join(', ')}</p>
            <p>Missing ingredients: ${recipe.missedIngredients.map(i => i.name).join(', ')}</p>
            <button onclick="getRecipeDetails(${recipe.id})">Get Recipe Details</button>
            <div id="details-${recipe.id}"></div>
        `;
        recipesDiv.appendChild(recipeDiv);
    });
}

// Function to get and display recipe details
async function getRecipeDetails(recipeId) {
    const apiKey = '62dbe012ad8a4cf6ae7ff58a44eb0323'; // Replace with your Spoonacular API key
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const detailsDiv = document.getElementById(`details-${recipeId}`);
        detailsDiv.innerHTML = `
            <h3>Instructions</h3>
            <p>${response.data.instructions || 'No instructions available'}</p>
        `;
        console.log('Recipe details:', response.data); // Log details data for debugging
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

// Function to clear results and go back to the homepage
function goToHome() {
    document.getElementById('recipes').innerHTML = ''; // Clear recipes
    document.getElementById('ingredients').value = ''; // Clear input field
    document.getElementById('backButton').style.display = 'none'; // Hide Back to Home button
    console.log('Returned to homepage'); // Log for debugging
}
