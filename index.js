let userData = {
    routes: [],
    steps: 0
};

function showNumberInput() {
    document.getElementById("numberInputPage").style.display = "block";
}

function generateRoute() {
    let numbers = document.getElementById("numberInput").value;
    if (numbers.length !== 4) {
        alert("Please enter four numbers!");
        return;
    }

    let route = {};  // This would be the object holding route details.

    userData.routes.push(route);

    document.getElementById("numberInputPage").style.display = "none";
    document.getElementById("mapPage").style.display = "block";
}
