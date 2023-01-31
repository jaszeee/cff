"use strict";
const cityDeparture = document.querySelector("h1");
const getArrivalsBoard = document.querySelector("#board");

const getStations = (city, nb) => {
	fetch(
		`https://transport.opendata.ch/v1/stationboard?station=${city}&limit=${nb}`
	)
		//pas console log les json !!!!!!!!
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			data.stationboard.forEach((train) => {
				getArrivals(train);
				cityDeparture.innerHTML = data.station.name;
			});
		});
};
getStations("Lausanne", 10);

const getArrivals = (city) => {
	const time = new Date(city.stop.departure);
	const minutes = time.getMinutes().toString().padStart(2, "0");
	const hour = time.getHours();
	const html = `<article>
    <div class="time">${hour + " : " + minutes}</div>
    <div class="category" data-category="${city.category}">${
		city.category
	}</div>
    <div class="destination">${city.to}</div>
</article>`;

	getArrivalsBoard.insertAdjacentHTML("beforeend", html);
};
