 export class ChatMessage {
    $id?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent: Date = new Date();
    mineAbove?: boolean;
 }