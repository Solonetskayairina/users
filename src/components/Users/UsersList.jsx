    import React from "react";
    import { Link } from "react-router-dom";
    import { useUserContext} from "../../useContext";
    import "./UsersList.css";

    export default function UsersList() {
        const {users, userDelete} = useUserContext()

        return (
            <div className="users-list-container">
                <h2>A list of users</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>
                                <button>
                                    <Link to={`/user/${user.id}`} >Edit</Link>
                                </button>
                                <button onClick={() => userDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to="/createuser" className="create-user-link">Create User</Link>
            </div>
        );
    }