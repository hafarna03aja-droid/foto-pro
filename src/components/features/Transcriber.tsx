import React, { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, XIcon, DocumentDuplicateIcon } from '../icons';

// Extend Window interface for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const Transcriber: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Browser Anda tidak mendukung fitur Speech-to-Text. Gunakan Google Chrome.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'id-ID'; // Default Bahasa Indonesia

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript) {
                setTranscript((prev) => prev + ' ' + finalTranscript);
            }
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    const clearTranscript = () => {
        setTranscript('');
        setError(null);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcript);
        alert('Teks berhasil disalin!');
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-3">
                    <MicrophoneIcon className="w-8 h-8 text-teal-500 dark:text-cyan-400" />
                    <div>
                        <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">Transcriber</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ubah suara menjadi teks secara real-time</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Controls */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={toggleListening}
                            className={`p-6 rounded-full transition-all transform hover:scale-105 shadow-lg ${isListening
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                : 'bg-teal-500 hover:bg-teal-600'
                                }`}
                            title={isListening ? 'Stop Recording' : 'Start Recording'}
                        >
                            <MicrophoneIcon className="w-12 h-12 text-white" />
                        </button>
                    </div>

                    <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
                        {isListening ? 'Mendengarkan... (Bicara sekarang)' : 'Klik mikrofon untuk mulai merekam'}
                    </p>

                    {error && (
                        <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    {/* Transcript Area */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[300px] relative">
                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="Hasil transkripsi akan muncul di sini..."
                            className="w-full h-full min-h-[250px] resize-none border-none focus:ring-0 bg-transparent text-gray-800 dark:text-gray-200 text-lg leading-relaxed"
                        />

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!transcript}
                                className="p-2 text-gray-500 hover:text-teal-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors disabled:opacity-50"
                                title="Salin Teks"
                            >
                                <DocumentDuplicateIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={clearTranscript}
                                disabled={!transcript}
                                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                                title="Hapus Teks"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>Tips: Pastikan izin mikrofon diaktifkan di browser Anda.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
