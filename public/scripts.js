document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const resultsContainer = document.getElementById('results');
    
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchQuery = document.getElementById('searchQuery').value;
      
      try {
        const response = await fetch(`/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        // Update results container with fetched data
        resultsContainer.innerHTML = '';
        data.forEach(recipe => {
          resultsContainer.innerHTML += `
            <div class="recipe-card">
              <h3>${recipe.name}</h3>
              <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
              <p><strong>Directions:</strong> ${recipe.directions}</p>
            </div>
          `;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = 'An error occurred';
      }
    });
  });