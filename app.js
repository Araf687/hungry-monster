urlAllMeal='https://www.themealdb.com/api/json/v1/1/categories.php';
function loadData()
{
    fetch(urlAllMeal)
    .then(res => res.json())
    .then(data => {
        displayAllMeals(data);
    })
}
loadData();
function displayAllMeals(data){
    const parentNode=document.getElementById('meal-dashboard');
    for (let i = 0; i < data.categories.length; i++) {
        const category=document.createElement('div');
        category.className='div-category';

        const categoryName=data.categories[i].strCategory;
        const categoryImg=data.categories[i].strCategoryThumb;
        categoryInfo=`
            <img class="img" src="${categoryImg}" >
            <div class="dishName" >${categoryName}</dv>
        `
        category.innerHTML=categoryInfo;
        parentNode.appendChild(category);
        console.log(data);
        console.log(categoryName,categoryImg);
    }
}
document.getElementById('meal-dashboard').addEventListener('click',function(event){
    const selectDishName=event.target.parentNode.innerText;
    console.log(selectDishName,typeof(selectDishName));
    const urlMealName=`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectDishName}`
    fetch(urlMealName)
    .then(res => res.json())
    .then(data =>{
        console.log(data.meals[0])
    })
})
