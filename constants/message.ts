import { Message } from "@/types/type";


export const messages: Message[] = [
    // User 1
    {
        id: '1',
        senderId: 'admin',
        receiverId: '1',
        content: "Hello User 1, welcome!",
        timestamp: new Date().toISOString(),
        ismessaged: true

    },
    {
        id: '2',
        senderId: '1',
        receiverId: 'admin',
        content: "Thank you, admin!",
        timestamp: new Date().toISOString(),

        ismessaged: true
    },
    {
        id: '11',
        receiverId: '1',
        senderId: 'admin',
        content: "Thank you, admin!",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    // User 2
    {
        id: '3',
        senderId: 'admin',
        receiverId: '2',
        content: "Hello User 2, how can I help you?",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    {
        id: '4',
        senderId: '2',
        receiverId: 'admin',
        content: "I need some assistance.",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    // User 3
    {
        id: '5',
        senderId: 'admin',
        receiverId: '3',
        content: "Hi User 3, good to see you.",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    {
        id: '6',
        senderId: '3',
        receiverId: 'admin',
        content: "Hi admin, glad to be here.",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    // User 4
    {
        id: '7',
        senderId: 'admin',
        receiverId: '4',
        content: "Welcome User 4!",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    {
        id: '8',
        senderId: '4',
        receiverId: 'admin',
        content: "Thank you!",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    // User 5
    {
        id: '9',
        senderId: 'admin',
        receiverId: '5',
        content: "Hello User 5, let me know if you need help.",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
    {
        id: '10',
        senderId: '5',
        receiverId: 'admin',
        content: "Sure, will do. Thanks!",
        timestamp: new Date().toISOString(),
        ismessaged: true
    },
];