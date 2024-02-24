    import React, { useEffect, useState } from "react";
    import {updateUser} from "../../services/services";
    import {Link} from "react-router-dom";
    import { useHistory } from "react-router-dom";
    import { useUserContext } from "../../useContext";
    import "./EditUser.css"

    export default function EditUser({ id }) {
        const [formData, setFormData] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const { updateUser: updateUserContext, getUserById } = useUserContext();
        const history = useHistory();


        const handleInputChange = (event) => {
            const { name, value } = event.target;

            const updatedFormData = {
                ...formData,
                [name]: value,
            };

            if (name === "city" || name === "street") {
                updatedFormData.address = {
                    ...updatedFormData.address,
                    [name]: value,
                };
            }

            setFormData(updatedFormData);
        };

        useEffect(() => {
            const fetchData = () => {

                try {
                    const userData = getUserById(id);
                    setFormData(userData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchData();
        }, []);
        const changeUserData = async (event) => {
            event.preventDefault();
            try {
                if (formData) {
                    setIsLoading(true);
                    const apiResponse = await updateUser(id, formData);
                    updateUserContext(apiResponse);
                    history.push("/");
                } else {
                    console.error("Form data is null");
                }
            } catch (error) {
                console.error("Error updating user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!formData) {
            return <div>Loading...</div>;
        }

        return (
            <form key={formData.id}>
                <div className="input-container">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData?.name ? formData?.name : ''} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData?.username ? formData?.username: ''} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={formData?.email ? formData?.email : ''} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={formData?.address?.city ? formData?.address?.city : (formData?.city ? formData?.city : '') } onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="street">Street:</label>
                    <input type="text" id="street" name="street" value={formData?.address?.street ? formData?.address?.street : (formData?.street ? formData?.street : '')} onChange={handleInputChange}  />
                </div>
                <div className="button-container">
                    <button onClick={changeUserData}>Save</button>
                    <button>
                        <Link to="/">Cancel</Link>
                    </button>
                </div>
                {isLoading && <div>Loading...</div>}
            </form>
        );
    }
