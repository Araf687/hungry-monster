function createChild(tagName,className,categoryName,categoryImg,parentNode)
{
    const category=document.createElement(tagName);
    category.className=className;
    categoryInfo=`
            <img class="img" src="${categoryImg}" >
            <div class="dishName" >${categoryName}</dv>
        `
        category.innerHTML=categoryInfo;
        parentNode.appendChild(category);

}
function removeAllChildNodes(parent) {
    document.getElementById('monster-logo').style.display='none';
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function searchByLetter(data){
    const parentNode=document.getElementById('meal-dashboard');
    for (let i = 0; i < data.meals.length; i++) {
        const categoryName=data.meals[i].strMeal;
        const categoryImg=data.meals[i].strMealThumb;
        createChild('div','div-category',categoryName,categoryImg,parentNode);
    }
}
document.getElementById('submit-btn').addEventListener('click',function(){
    const mealName=document.getElementById('input').value;
    searchData(mealName);

})

function searchData(meal){
    if(meal.length==0)
    {
        alert("search bar is empty.Please search with proper data.");
    }
    else if(meal.length==1)
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
        .then(res => res.json())
        .then(data => { 
            const parentNode=document.getElementById('meal-dashboard');
            removeAllChildNodes(parentNode);
            searchByLetter(data);
        })
        .catch(function(){
            alert('You have given wrong meal name or id or wrong category.Please search the valid data');
        })
    }
    else if(parseFloat(meal))
    {
        const id=parseFloat(meal);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => { 
            console.log(data);
            const parentNode=document.getElementById('meal-dashboard');
            removeAllChildNodes(parentNode);
            searchByLetter(data);
        })
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            const parentNode=document.getElementById('meal-dashboard');
            removeAllChildNodes(parentNode);
            searchByLetter(data);
        })
    }

}
document.getElementById('meal-dashboard').addEventListener('click',function(event){
        const parentDiv=event.target.parentNode;
        const mealName=parentDiv.innerText;
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res=>res.json())
        .then(data=> {
            const imageSrc=data.meals[0].strMealThumb;
            const mainDiv=document.getElementById('main');
            document.getElementById('meal-dashboard').style.display='none';
            document.getElementById("search-section").style.display='none';
            const mealDescription=document.createElement('div');
            mealDescription.id='description'
            description=`  
            <img src="${imageSrc}" alt="">
            <div class=meal-Ingredient>
                <h2>${mealName}</h2>
                <h6>Ingredients</h6>
                <ul>
                    <li>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</li>
                    <li>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</li>
                    <li>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</li>
                    <li>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</li>
                    <li>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</li>
                    <li>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</li>
                </ul>
            </div>`
            
            mealDescription.innerHTML=description;
            mainDiv.appendChild(mealDescription);
        })
       

        

})