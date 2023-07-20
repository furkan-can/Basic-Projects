class Profile {
    constructor() {
        this.clientId = "";
        this.clientSecret = "";
    }

    async getProfiles() {
        const profilesRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const profiles = await profilesRes.json();

        return { profiles }
    }


    async getProfile(userName) {
        const profileRes = await fetch(`https://jsonplaceholder.typicode.com/users?username=${userName}`);
        const profile = await profileRes.json();

        let toDo =[];
        if (profile[0]) {
            const toDoRes = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`)
            toDo = await toDoRes.json();
        }



        return { profile, toDo }
    }
}