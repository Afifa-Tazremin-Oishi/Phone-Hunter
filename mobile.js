document.getElementById('error-message').style.display = 'none'    

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
    //clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';  

    if(searchText == ''){
      // please write something to display
    }
    else{
    //load data
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
    .catch(error => displayError(error));
    } 
}
const displayError = error => {
  document.getElementById('error-message').style.display = 'block';    

}

const displaySearchResult = products => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(products.length == 0){
      // No result found
    }
    products.forEach(product =>{
        //console.log(meals);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <div onclick="loadMealDetail(${meals.idMeal})" class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.slug}</h5>
              <p class="card-text">${meals.strInstructions.slice(0, 250)}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = mealId => {
    //console.log(mealId);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meals => {
    console.log(meals);
    const mealDetails = document.getElementById('meal-details')
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meals.strMeal}</h5>
          <p class="card-text">${meals.strInstructions.slice(0, 250)}</p>
          <a href="${meals.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}