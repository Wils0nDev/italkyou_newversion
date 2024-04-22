export interface Chatlist {
    _id:          string;
    user_id:      string;
    name_chat:    string;
    type_chat:    number;
    chat_image:   ChatImage;
    updated_at:   number;
    last_message: LastMessage;
}

export interface ChatImage {
    thumb:    string;
    medium:   string;
    original: string;
}

export interface LastMessage {
    _id:       string;
    chat_id:   string;
    message:   string;
    type:      number;
    user_id:   string;
    host:      string;
    date_send: number;
    ruta:      string;
    photo:     string;
    members:   Member[];
}

export interface Member {
    user_id: string;
    send:    number;
}
