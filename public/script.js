// on click of <button id="fetch">Fetch Data</button>
document.getElementById('fetch').addEventListener('click', async function () {
    const response = await fetch('/__tests__v1/launches');
    const fetchedData = await response.json();
    // <div id="data"></div>
    document.getElementById('data').innerHTML = JSON.stringify(fetchedData, null, 2);
    
    console.log(fetchedData);
});
