    import React from "react";
    import EditUser from "../components/User/EditUser";
    import { useParams } from "react-router-dom";

    export default function User() {
        const { id } = useParams();

        return (
            <div>
                <EditUser id={id} />
            </div>
        );
    }