
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
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
            const response = await axios.put(`http://localhost:5000/api/profile/update/${userId}`, {
                name: user.name,
                email: user.email,
            });
            setUser(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>User Profile</Text>
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
                placeholder="Name"
            />
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                placeholder="Email"
                keyboardType="email-address"
            />
            <Button title="Update Profile" onPress={handleUpdate} />
        </View>
    );
}
