/* 
El objetivo de esta clase es que gestione todo lo relacionado a usuarios, osea que tendra la capacidad tanto de crearlos (Con datos proporcionados por el cliente) y a su vez de traer registros de usuarios ya existentes gestionados por una Api

"https://jsonplaceholder.typicode.com/users"
*/


class User {
    //Propiedades inherentes a la clase
    static #url = 'https://jsonplaceholder.typicode.com/users';
    static #usersListArray = [];
    static #listOfUsers = document.createElement('ul');


    //Getters & Setters
    static get url() {
        return this.#url;
    }
    static set url(newUrl) {
        if ((typeof (newUrl) == 'string') && (newUrl.startsWith('https'))) {
            this.#url = newUrl;
            return this.#url;
        } else {
            console.log('Error, URL invalida');
        }
    }
    static get usersListArray() {
        return this.#usersListArray;
    }
    static get listOfUsers() {
        return this.#listOfUsers;
    }



    //Constructor para las instancias
    constructor(name, email) {
        this.name = name;
        this.email = email;
    };



    static async getUsersFromServer() {
        try {
            const response = await fetch(this.#url);
            if (!response.ok) {
                throw response
            };
            this.#usersListArray = await response.json();
            return this.#usersListArray
        } catch (error) {
            console.log('Error en la petición HTTP (GET)');
            throw error;
        }
    }

    static createListItem(data) {
        let listItem = document.createElement('li');
        listItem.textContent = data;
        return listItem;
    }

    static fillListWithUsers() {
        this.#listOfUsers.innerHTML = '';
        for (const user of this.#usersListArray) {
            this.#listOfUsers.appendChild(this.createListItem(user.name));
        }
    }

    static async sendNewUserToServer(newUserData) {
        try {
            let response = await fetch(this.#url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            })
            if (!response.ok) {
                throw response;
            };
            let responseFromServer = await response.json();
            console.log(responseFromServer);
            return responseFromServer
        } catch (error) {
            console.log('Error en la petición HTTP (POST)');
            throw error;
        }
    }
}















async function main() {
    try {
        console.log('Hola Mundo');
        //
        await User.getUsersFromServer();
        User.fillListWithUsers();

        //HTML Elements
        let userNameInput = document.querySelector('#user-name');
        let userMailInput = document.querySelector('#user-mail');
        let btnCreateNewUser = document.querySelector('#btn-create-user');
        let btnShowUsers = document.querySelector('#btn-show-users');
        let usersListContainerElement = document.querySelector('#users-list-container');

        //Events
        btnShowUsers.addEventListener('click', () => {
            usersListContainerElement.appendChild(User.listOfUsers);
        })
        btnCreateNewUser.addEventListener('click', async () => {
            let newUser = {
                name: userNameInput.value,
                email: userMailInput.value,
            }
            //Send new User to server
            await User.sendNewUserToServer(newUser);

            //Add user to list (We update the array and refill the list with the New array)
            User.usersListArray.push(newUser);
            User.fillListWithUsers();

            //Add the list back to view (Updated List)
            usersListContainerElement.appendChild(User.listOfUsers);
            userNameInput.value = '';
            userMailInput.value = '';
        })

    } catch (error) {
        console.log('Error', error);
    }
};
main();