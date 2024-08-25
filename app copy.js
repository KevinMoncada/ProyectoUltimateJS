/* 
El objetivo de esta clase es que gestione todo lo relacionado a usuarios, osea que tendra la capacidad tanto de crearlos (Con datos proporcionados por el cliente) y a su vez de traer registros de usuarios ya existentes gestionados por una Api

"https://jsonplaceholder.typicode.com/users"
*/

class User {
    constructor() {
    }
    static #url = "https://jsonplaceholder.typicode.com/users";
    static #usersCalled = [];

    static async getAllUsers() {
        try {
            const response = await fetch(this.#url);
            if (!response.ok) {
                throw response;
            }
            const usersData = await response.json();
            this.usersCalled = usersData;
            return this.#usersCalled;
        } catch (err) {
            throw err;
        }
    }
}



async function main() {
    try {
        console.log("Hola mundo");
        await User.getAllUsers();
    } catch (error) {
        console.log("Error: ", error);
    }
}
main();