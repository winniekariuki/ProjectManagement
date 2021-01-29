import { authHeader } from '../helpers';

export const opportunityService = {
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

    return fetch(`https://projectmanagementbackend.herokuapp.com/opportunity`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://projectmanagementbackend.herokuapp.com/opportunity/${id}`, requestOptions).then(handleResponse);
}
function logout() {
    localStorage.removeItem('user');
}

function create(opportunity) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(opportunity)
    };

    return fetch(`https://projectmanagementbackend.herokuapp.com/opportunity`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
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