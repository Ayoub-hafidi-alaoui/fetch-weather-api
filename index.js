input = document.getElementById("location")
row = document.getElementById("row")

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const get_weather_data = async function (city = "paris") {
    data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d839f048e45e43a2932203908221510&q=${city}&days=3`)
    data = await data.json()
    data = data.current
    console.log("data", data)
    return data
};
const fill_data = function (city, data) {
    const date = new Date(data.last_updated)
    month = monthNames[date.getMonth()]
    day = days[date.getDay()]
    let div = `
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-around">
                            <h5 class="card-title">${day}</h5>
                            <h5 class="card-title">${date.getUTCDate()} ${month}</h5>
                            <img src="${data.condition.icon}" />
                        </div>
                        <h6 class="card-subtitle mb-2 text-muted">${city}</h6>
                        <h2>${data.feelslike_c}</h2>
                        <h3>${data.condition.text}</h3>
                    </div>
                </div>
            </div>
    `
    row.innerHTML = div
}
input.addEventListener("keyup", async (e) => {
    var data = await get_weather_data(e.target.value)
    await fill_data(e.target.value, data)

})



