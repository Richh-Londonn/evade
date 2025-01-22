
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { setupWebSocket } from '../services/WebSocketService';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = setupWebSocket((message) => {
            if (message.type === 'NOTIFICATION') {
                setNotifications((prev) => [...prev, message.message]);
            }
        });

        return () => {
            socket.close();
        };
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    );
}
