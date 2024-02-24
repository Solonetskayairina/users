    import React, {useState} from "react";
    import {addUser} from "../../services/services";
    import {useHistory} from "react-router-dom";
    import {useUserContext} from "../../useContext";
    import "./CreateUserItem.css"

    export default function CreateUserItem() {
        const [inputForm, setInputForm] = useState({
            name: '',
            username: '',
            email: '',
            address: {
                city: '',
                street: ''
            }
        });

        const { saveUser } = useUserContext()

        const history = useHistory()
        const handleSubmit = async (event) => {
            event.preventDefault();
            const addedUser =  await addUser(inputForm);

            const userWithIdFirst = {
                id: addedUser.id,
                ...addedUser,
            };

            setInputForm(userWithIdFirst);
            saveUser(userWithIdFirst);
            history.push('/');
            console.log("Submitted Form Data:", userWithIdFirst);
        };

        const handleInputChange = (event) => {
            const { name, value } = event.target;

            if (name === "city" || name === "street") {
                setInputForm((prevData) => ({
                    ...prevData,
                    address: {
                        ...prevData.address,
                        [name]: value
                    }
                }));
            } else {
                setInputForm((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }

        return(
            <div>
                <h1>Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={inputForm?.name ? inputForm?.name  : ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-container">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={inputForm?.username ? inputForm?.username : ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-container">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" value={inputForm?.email ? inputForm?.email : '' } onChange={handleInputChange} />
                    </div>
                    <div className="form-container">
                        <label htmlFor="city">City:</label>
                        <input type="text" name="city" value={inputForm?.address.city || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-container">
                        <label htmlFor="street">Street:</label>
                        <input type="text" name="street" value={inputForm?.address.street || ''} onChange={handleInputChange}  />
                    </div>
                    <div className="button-container">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
