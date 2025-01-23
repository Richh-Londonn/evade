
import React, { useState, useEffect } from 'react';

export default function OfflineNotice() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        !isOnline && (
            <div style={{ padding: '10px', background: '#ffcccb', textAlign: 'center' }}>
                You are offline. Some features may not be available.
            </div>
        )
    );
}
