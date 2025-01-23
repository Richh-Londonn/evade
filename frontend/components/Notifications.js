
import React, { useEffect, useState } from 'react';
import { setupWebSocket } from '../utils/websocket';

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
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}
