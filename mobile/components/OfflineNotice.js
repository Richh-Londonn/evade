
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OfflineNotice() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    if (isOnline) return null;

    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>You are offline. Some features may not be available.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#ffcccb',
        padding: 10,
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
    },
    offlineText: {
        color: '#000',
    },
});
