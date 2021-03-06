import { authHeader } from '../helpers';

export const organisationService = {
    getAll,
    create,
    getById,
    logout,

};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://projectmanagementbackend.herokuapp.com/account`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://projectmanagementbackend.herokuapp.com/account/${id}`, requestOptions).then(handleResponse);
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function create(account) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(account)
    };
    console.log("body", requestOptions.body)

    return fetch(`https://projectmanagementbackend.herokuapp.com/account`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}