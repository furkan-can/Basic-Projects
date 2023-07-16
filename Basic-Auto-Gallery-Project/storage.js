function Storage() {
    
}

Storage.prototype.addCarToStorage = function (car) {
    let cars = this.getCarsFromStorage();
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
}

Storage.prototype.getCarsFromStorage = function () {
    let cars = [];
    if (localStorage.getItem('cars') === null) {
        cars = [];
    } else {
        cars = JSON.parse(localStorage.getItem('cars'));
    }
    return cars;
}

Storage.prototype.deleteCarFromStorage = function (carTitle) {
    let cars = this.getCarsFromStorage();
    cars.forEach(function (car, index) {
        if (car.title === carTitle) {
            cars.splice(index, 1);
        }
    });
    localStorage.setItem('cars', JSON.stringify(cars));
}

Storage.prototype.deleteAllCars = function () {
    localStorage.removeItem('cars');
}