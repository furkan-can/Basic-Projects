const movieList = document.querySelector(".movie-list select");
const container = document.querySelector(".container");
const text = document.querySelector(".text");
const info = document.querySelector(".info");
const btn = document.getElementById("btn");
const countSelectedSeats = text.querySelector("#count");
const priceSelectedSeats = text.querySelector("#total-price");
const seats = container.querySelectorAll(".seat");

let moviePrice = 0;
let selectedSeatsCount = 0;
let movieName = "";

let movieInfoData = [];

movieList.addEventListener("change", function (e) {
  let getMovieSelectedData =
    JSON.parse(localStorage.getItem("selectedSeats")) || [];
  let getMovieReservedData =
    JSON.parse(localStorage.getItem("reservedSeats")) || [];

  moviePrice = e.target.value;
  container.classList.remove("not-displayed");
  text.classList.remove("not-displayed");
  info.classList.remove("not-displayed");
  movieName = e.target.options[e.target.selectedIndex].text;

  container.querySelectorAll(".seat").forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.remove("reserved");
  });

  if (getMovieSelectedData !== null) {
    getMovieSelectedData.forEach((item) => {
      if (item.movieName === movieName) {
        item.selectedSeatsIndex.forEach((index) => {
          seats[index].classList.add("selected");
        });
      }
    });
  }

  if (getMovieReservedData !== null) {
    getMovieReservedData.forEach((item) => {
      if (item.movieName === movieName) {
        item.reservedSeatsindex.forEach((index) => {
          seats[index].classList.add("reserved");
        });
      }
    });
  }
  
  buyTickets(getMovieSelectedData);
  calculatePrice();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");

    let data = prepareData();

    if (localStorage.getItem("data") !== null) {
      movieInfoData = JSON.parse(localStorage.getItem("selectedSeats"));
    }
    if (movieInfoData.length > 0) {
      movieInfoData.forEach((item) => {
        if (item.movieName === movieName) {
          movieInfoData.splice(movieInfoData.indexOf(item), 1);
        }
      });
    }
    movieInfoData.push(data);

    localStorage.setItem("selectedSeats", JSON.stringify(movieInfoData));
    buyTickets(movieInfoData);
  }
});

function buyTickets(data) {
    btn.classList.add("not-displayed");
  if (data.length > 0) {
    data.forEach((item) => {
      if (item.movieName === movieName && item.selectedSeatsIndex.length > 0) {
        btn.classList.remove("not-displayed");
      }
    });
  }
}

function calculatePrice() {
  selectedSeats = container.querySelectorAll(".selected");

  selectedSeatsCount = selectedSeats.length;
  countSelectedSeats.textContent = selectedSeatsCount;
  priceSelectedSeats.textContent = selectedSeatsCount * moviePrice;

  return selectedSeats;
}

function prepareData() {
  selectedSeats = calculatePrice();
  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  const data = {
    movieName: movieName,
    moviePrice: Number(moviePrice * selectedSeatsCount),
    selectedSeatsIndex: selectedSeatsIndex,
  };

  return data;
}

btn.addEventListener("click", function () {
  let reservedSeats = [];
  let indexes = [];

  movieInfoData.map((item) => {
    if (item.movieName === movieName) {
      item.selectedSeatsIndex.forEach((index) => {
        seats[index].classList.add("reserved");
        indexes.push(index);
        seats[index].classList.remove("selected");
      });
    }
  });

  if (localStorage.getItem("reservedSeats") !== null) {
    reservedSeats = JSON.parse(localStorage.getItem("reservedSeats"));
    reservedSeats.forEach((item) => {
      if (item.movieName === movieName) {
        indexes.push(...item.reservedSeatsindex);
        reservedSeats.splice(reservedSeats.indexOf(item), 1);
      }
    });
  }
  reservedSeats.push({ movieName: movieName, reservedSeatsindex: indexes });

  localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));

  localStorage.removeItem("selectedSeats");
  movieInfoData = [];
  btn.classList.add("not-displayed");
  calculatePrice();
  alert("Thank you for your purchase!");
});
