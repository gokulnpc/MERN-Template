console.log("Hello from script.js!");

document.getElementById('getPlanets').addEventListener('click', () => {
    fetch('/v1/planets')
        .then(response => response.json())
        .then(data => {
            document.getElementById('planets').innerHTML = JSON.stringify(data);
        });
});