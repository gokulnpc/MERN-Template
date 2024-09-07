console.log("Hello from script.js!");

document.getElementById('getPlanets').addEventListener('click', () => {
    fetch('http://localhost:3000/v1/planets')
        .then(response => response.json())
        .then(data => {
            document.getElementById('planets').innerHTML = JSON.stringify(data);
        });
});