 export class ChatMessage {
    $id?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent: Date = new Date();
    mineAbove?: boolean;
    urlContent?: string;
    contentType?: string;
    size?: number;
    hasMedia: boolean;
 }