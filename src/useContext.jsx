    import React, {createContext, useContext, useEffect, useState} from 'react';
    import {deleteUser, getList} from "./services/services";

    const UserContext = createContext();

    export const useUserContext = () => useContext(UserContext);

    export const UserProvider = ({ children }) => {
        const [users, setUsers] = useState([]);

        const getUserById = (id) => {
            const result = users.find((user) => user.id == id);
            return result;
        }

        const updateUser = (updatedUser) => {
            if(updatedUser){
                setUsers(prevUsers =>
                    prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
                );
            }
        };

        const saveUser = (user) => {
            setUsers([...users, user]);
        }

        const userDelete = async (id) => {
            await deleteUser(id)
            setUsers(users.filter((user) => user.id !== id));
        };

        useEffect(() => {
            (async () => {
                let usersData = await getList();
                setUsers(usersData);
            })();
        }, [setUsers]);

        return (
            <UserContext.Provider value={{ users,getUserById, updateUser, saveUser, userDelete }}>
                {children}
            </UserContext.Provider>
        );
    };