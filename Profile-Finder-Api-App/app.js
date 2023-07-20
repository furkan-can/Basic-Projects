const profile = new Profile();
const ui = new UI();

const inputSearch = document.querySelector("#searchProfile");
const profileContainer = document.querySelector("#profileContainer");
const btnAllProfiles = document.querySelector(".btnallprofiles");




btnAllProfiles.addEventListener("click", () => {
    ui.clear();
    inputSearch.value = "";
    profile.getProfiles()
        .then(res => {
            ui.showProfiles(res.profiles);
        });
});

profileContainer.addEventListener("click", (e) => {

    const clickedElement = e.target;

    if (clickedElement.classList.contains("pavatar")) {
        const userName = clickedElement.getAttribute("id");
        searchProfile(userName);
    }
});



inputSearch.addEventListener("keyup", (e) => {
    searchProfile(e.target.value);
});

const searchProfile = (text) => {
    ui.clear();

    if (text !== "") {
        profile.getProfile(text)
            .then(res => {
                if (res.profile.length === 0) {
                    ui.showAlert(text);
                } else {
                    ui.showProfile(res.profile[0]);
                    ui.showTodo(res.toDo);
                }
            });
    }
}