    const API = `https://jsonplaceholder.typicode.com/users`;

    export const getList = () => fetch(API).then((response) => response.json());

    export const deleteUser = (id) =>
        fetch(`${API}/${id}`, {
            method: 'DELETE'
        }).then(data => data.json())

    export const updateUser = (id, obj) =>
        fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then((response) => response.json());

    export const addUser = (obj) =>
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then((response) => response.json());