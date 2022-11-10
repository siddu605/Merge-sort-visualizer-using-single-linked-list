let layoutElement = document.getElementById('array-layout-input'); // Array Layout Element
let sortOrderElement = document.getElementById('sort-order-input'); // Sort Order Element
let values1Element = document.getElementById('array-values-input1'); // Values Element 
let values2Element = document.getElementById('array-values-input2'); // Values Element 
let runButtonElemet = document.getElementById('run-button'); // Run Button
let resetButtonElemet = document.getElementById('reset-button'); // Reset Button Element

let visualizeContainer = document.getElementById('visualize-container'); // Container Element which holds sorted Bar or Array

let data = {
    layout: layoutElement.value, // store array layout selected by user
    sortOrder: sortOrderElement.value, // sort order
    values1: "" ,// values entered by user
    values2: "" // values entered by user
}

// handle layout array dropdown change
layoutElement.addEventListener('change', (e) => {
    data.layout = e.target.value;
});

// handle sort order dropdown change
sortOrderElement.addEventListener('change', (e) => {
    data.sortOrder = e.target.value;
});

// handle input array1 values entered by user
values1Element.addEventListener('input', (e) => {
    let currValue = e.target.value;
    if(currValue.length > data.values1.length){
        let lastChar = currValue[currValue.length-1];
        let validInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
        if(validInput.indexOf(lastChar) == -1){
            values1Element.value = data.values1;
            return;
        }
    }
    if(currValue[0] == ','){
        values1Element.value = currValue.slice(1);
        data.values1 = currValue.slice(1);
        return;
    }
    if(currValue.length > 1 && currValue[currValue.length-1] == ',' && currValue[currValue.length-2] == ','){
        values1Element.value = data.values1;
        return;
    }
    data.values1 = currValue;
});

// handle input array2 values entered by user
values2Element.addEventListener('input', (e) => {
    let currValue = e.target.value;
    if(currValue.length > data.values2.length){
        let lastChar = currValue[currValue.length-1];
        let validInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
        if(validInput.indexOf(lastChar) == -1){
            values2Element.value = data.values2;
            return;
        }
    }
    if(currValue[0] == ','){
        values2Element.value = currValue.slice(1);
        data.values2 = currValue.slice(1);
        return;
    }
    if(currValue.length > 1 && currValue[currValue.length-1] == ',' && currValue[currValue.length-2] == ','){
        values2Element.value = data.values2;
        return;
    }
    data.values2 = currValue;
});


// handle reset button click event
resetButtonElemet.addEventListener('click', () => {
    values1Element.value = "";
    values2Element.value = "";
    data.values1 = "";
    data.values2 = "";
});

// handle run button click 
runButtonElemet.addEventListener('click', () => {
    console.log(data);
    let array1Values = data.values1.split(','); // spliting array values with comma
    array1Values = array1Values.filter( value => value != ""); // removing empty value 
    if(array1Values.length > 20){
        alert(`Array1 Size can't be more than 20`);
        return;
    }

    if(array1Values.length == 0){
        alert(`Array1 can't be empty!`);
        return;
    }
    let array2Values = data.values2.split(','); // spliting array values with comma
    array2Values = array2Values.filter( value => value != ""); // removing empty value 
    // showing alert if entered values size not matched with selected size from dropdown
    if(array2Values.length > 20){
        alert(`Array2 Size can't be more than 20`);
        return;
    }
    if(array2Values.length == 0){
        alert(`Array2 can't be empty!`);
        return;
    }
    let arrayValues = [...array1Values, ...array2Values];

    arrayValues = arrayValues.map(value => parseInt(value));
    let sortedValues = [];
    // checking sort order 'ascending' or 'descending'
    if(data.sortOrder == "ascending"){
        sortedValues = arrayValues.sort((a,b) => a-b);
    }else{
        sortedValues = arrayValues.sort((a,b) => a-b).reverse();
    }
    // after sorting displaying bar or array
    displayOutput(sortedValues)
    
});
function displayOutput(sortedValues){
    // display bars
    if(data.layout == 'bar'){
        let n = sortedValues.length;
        let maxVal = sortedValues[0] > sortedValues[n-1] ? sortedValues[0] : sortedValues[n-1];
        let percentValues = sortedValues.map(item => {
            return (item/maxVal)*100;
        });
        let htmlContent = `<div class="bar-container">`;
        for(let i=0;i<n;i++){
            htmlContent += generateBarElement(i, sortedValues[i], percentValues[i]);
        }
        htmlContent += '</div>'
        visualizeContainer.innerHTML = htmlContent;
    }else{
        // display array
        let n = sortedValues.length;
        let htmlContent = `<div class="array-container">`;
        for(let i=0;i<n;i++){
            htmlContent += generateArrayElement(i, sortedValues[i], sortedValues.length);
        }
        htmlContent += '</div>'
        visualizeContainer.innerHTML = htmlContent;
    }
}

// generates bar element
function generateBarElement(index, value, percent){
    let ele = `
        <div class="bar" style="height: ${percent}%">
            <div class="label">${value}</div>
            <div class="index">${index}</div>
        </div>
    `;
    return ele;
}

// genereate array box element
function generateArrayElement(index, value, length){
    let ele = '';
    if(index == 0){
        ele = `
            <div class="box box-first">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }else if (index == length -1){
        ele = `
            <div class="box box-last">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }else{
        ele = `
            <div class="box">
                <div class="label">${value}</div>
                <div class="index">${index}</div>
            </div>
        `;
    }
    return ele;
}