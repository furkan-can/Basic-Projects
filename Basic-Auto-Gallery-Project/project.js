const form = document.getElementById('car-form');
const titleElement = document.getElementById('title');
const priceElement = document.getElementById('price');
const imageElement = document.getElementById('url');
const cardbody = document.querySelectorAll('.card-body')[1];
const deleteAllCarsBtn = document.getElementById('clear-cars');

//Start of UI Class
const ui = new UI();
//Start of Storage Class
const storage = new Storage();

//Load all events
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addCar);
    document.addEventListener('DOMContentLoaded', loadAllCars);
    cardbody.addEventListener('click', deleteCar);
    deleteAllCarsBtn.addEventListener('click', deleteAllCars);
}

function addCar(e) {
    const title = titleElement.value;
    const price = priceElement.value;
    const url = imageElement.value;

    if (title === '' || price === '' || url === '') {
        ui.showAlert('Please fill in all fields', 'danger');
    } else {
        const car = new Car(title, price, url);
        ui.addCar(car);
        storage.addCarToStorage(car);
        ui.showAlert('Car Added', 'success');
    }
    ui.clearInputs(titleElement, priceElement, imageElement);
    e.preventDefault();
}

function loadAllCars() {
    let cars = storage.getCarsFromStorage();
    cars.forEach(function (car) {
        ui.addCar(car);
    });
}

function deleteCar(e) {
    if (e.target.id === 'delete-car') {
        ui.deleteCar(e);
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.showAlert('Car Removed', 'warning');
    }
}

function deleteAllCars(e) {
    if (confirm('Are you sure?')) {
        ui.deleteAllCars();
        storage.deleteAllCars();
        ui.showAlert('All Cars Removed', 'warning');
    }
}