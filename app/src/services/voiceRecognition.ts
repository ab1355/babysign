interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

declare var window: IWindow;

export class VoiceRecognitionService {
  recognition: any;
  isListening: boolean = false;
  language: string = 'en-US';

  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = this.language;
  }

  start(onResult: (text: string) => void, onError: (error: string) => void) {
    if (this.isListening) return;

    this.recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text.toLowerCase());
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      onError('Error starting voice recognition');
    }
  }

  stop() {
    if (!this.isListening) return;
    
    this.recognition.stop();
    this.isListening = false;
  }

  setLanguage(language: string) {
    this.language = language;
    this.recognition.lang = language;
  }
}
