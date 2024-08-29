import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log("User data from local storage", userData);//log
        if (!userData) {
            navigate(-1);
            return;
        }

        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                };
                const response = await axios.get('http://localhost:3001/fetchusers', config);
                console.log("User data from API", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Users</h3>
                    <div className="mt-4">
                        {users.map(user => (
                            <div key={user._id} className="mb-4">
                                <p className="text-sm font-medium text-gray-700">Name: {user.name}</p>
                                <p className="text-sm font-medium text-gray-700">Email: {user.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Users;