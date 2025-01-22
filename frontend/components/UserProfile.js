
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/profile/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/profile/update/${userId}`, {
                name: user.name,
                email: user.email,
            });
            setUser(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </label>
            <br />
            <button onClick={handleUpdate}>Update Profile</button>
        </div>
    );
}
