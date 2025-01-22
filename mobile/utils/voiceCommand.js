
import Voice from '@react-native-voice/voice';

export const useVoiceCommands = (onCommand) => {
    useEffect(() => {
        Voice.onSpeechResults = (event) => {
            const command = event.value[0].toLowerCase();
            console.log('Voice Command Received:', command);
            onCommand(command);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [onCommand]);

    const startListening = () => {
        Voice.start('en-US');
    };

    const stopListening = () => {
        Voice.stop();
    };

    return { startListening, stopListening };
};
