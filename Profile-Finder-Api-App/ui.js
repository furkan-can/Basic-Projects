class UI {
    constructor() {
        this.profileContainer = document.querySelector("#profileContainer");
        this.alert = document.querySelector("#alert");
    }

    showProfiles(profiles) {

        let html = `<div class="text-center d-grid">
                        <div class="row mt-4">`;

        profiles.map((profile, index) => {
            if ((index) % 4 === 0) {
                html += `
                </div>
                <div class="row mt-4">
                <div class="d-flex flex-column col pavatar" username="${profile.username}" >
                    <a href="#">
                        <img id="${profile.username}" class="img-thumbnail pavatar"
                        src="https://secure.gravatar.com/avatar/d6fd6bff19d7f0ad4024f3811474fe92?s=180&d=mm&r=g">
                    </a>
                    <span>Username : ${profile.username}</span>
                </div>`;

            } else {
                html += `
                <div class="d-flex flex-column col pavatar" username="${profile.username}">
                    <a href="#">
                        <img id="${profile.username}" class="img-thumbnail pavatar"
                        src="https://secure.gravatar.com/avatar/d6fd6bff19d7f0ad4024f3811474fe92?s=180&d=mm&r=g">
                    </a>
                    <span>Username : ${profile.username}</span>
                </div>`;
            }


        });

        html += `</div>`;

        this.profileContainer.innerHTML = html;
    }

    showProfile(profile) {
        this.profileContainer.innerHTML = `
            <div class="card card-body"> 
                <div class="row"> 
                    <div class="col-md-3"> 
                        <a href="#">
                            <img class="img-thumbnail" src="https://secure.gravatar.com/avatar/d6fd6bff19d7f0ad4024f3811474fe92?s=180&d=mm&r=g">
                        </a>
                    </div>
                    
                    <div class="col-md-9"> 
                        <h4>Contact</h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                                name: ${profile.name}
                            </li>

                            <li class="list-group-item">
                                username: ${profile.username}
                            </li>

                            <li class="list-group-item">
                                email: ${profile.email}
                            </li>

                            <li class="list-group-item">
                                address: ${profile.address.street}
                                ${profile.address.city}
                                ${profile.address.zipcode}
                                ${profile.address.suite}
                            </li>
                            
                            <li class="list-group-item">
                                phone: ${profile.phone}
                            </li>

                            <li class="list-group-item">
                                website: ${profile.website}
                            </li>

                            <li class="list-group-item">
                                company: ${profile.company.name}
                            </li>

                        </ul>
                        <h4>To-Do List</h4>
                        <ul id="todo" class="list-group"></ul>
                    </div>
                </div>
            </div>
        `;
    }

    showTodo(todos) {
        let html = "";
        todos.map((todo) => {
            if (todo.completed) {
                html += `
                    <li class="list-group-item bg-success">
                    ${todo.title}
                    </li>

                `;
            } else {
                html += `
                    <li class="list-group-item bg-secondary">
                    ${todo.title}
                    </li>
                `;
            }
        });

        this.profileContainer.querySelector("#todo").innerHTML = html;
    }

    showAlert(text) {
        this.alert.innerHTML = `${text} is not found`;
    }

    clear() {
        this.profileContainer.innerHTML = "";
        this.alert.innerHTML = "";
    }
}