// script.js
document.getElementById('calculateButton').addEventListener('click', function() {
    let productName = document.getElementById('productName').value;
    let productQuantity = document.getElementById('productQuantity').value;

    if (!productName || !productQuantity) {
        alert('Please enter the product name and quantity.');
        return;
    }

    fetchNutritionData(productName, productQuantity, false);
});

document.getElementById('addToDayButton').addEventListener('click', function() {
    let productName = document.getElementById('productName').value;
    let productQuantity = document.getElementById('productQuantity').value;

    if (!productName || !productQuantity) {
        alert('Please enter the product name and quantity.');
        return;
    }

    fetchNutritionData(productName, productQuantity, true);
});

function fetchNutritionData(productName, productQuantity, addToDay) {
    let xhr = new XMLHttpRequest();
    let url = `https://api.api-ninjas.com/v1/nutrition?query=${productName}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Api-Key', 'rvTq5+F9Rz5C7/FjICg8YQ==sfsGbLkyTzPEpJfw');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            if (data && data.length > 0) {
                let item = data[0];
                displayNutritionData(item, productQuantity, addToDay);
            } else {
                document.getElementById('result').innerHTML = 'Product not found.';
            }
        } else if (xhr.readyState === 4) {
            console.error('Error:', xhr.responseText);
        }
    };

    xhr.send();
}

function displayNutritionData(item, quantity, addToDay) {
    let calories = (item.calories * quantity / 100).toFixed(2);
    let protein = (item.protein_g * quantity / 100).toFixed(2);
    let fat = (item.fat_total_g * quantity / 100).toFixed(2);
    let carbs = (item.carbohydrates_total_g * quantity / 100).toFixed(2);

    let resultHTML = `<p>Calories: ${calories} kcal</p>
                      <p>Protein: ${protein} g</p>
                      <p>Fat: ${fat} g</p>
                      <p>Carbohydrates: ${carbs} g</p>`;

    document.getElementById('result').innerHTML = resultHTML;

    if (addToDay) {
        addToDailySummary(item.name, quantity, calories, protein, fat, carbs);
    }
}

function addToDailySummary(productName, quantity, calories, protein, fat, carbs) {
    let table = document.getElementById('dailySummary');
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    cell1.innerHTML = productName;
    cell2.innerHTML = quantity;
    cell3.innerHTML = calories;
    cell4.innerHTML = protein;
    cell5.innerHTML = fat;
    cell6.innerHTML = carbs;
}
