export enum EMIT_EVENT  {
    'onlines' = 'onlines',
    'dialogs' = 'dialogs',
    'messages' = 'messages',
    'messageRead' = 'messageRead'
}

export enum SUBSCRIBE_EVENT {
    'message' = 'message',
    'messageRemove' = 'messageRemove',
    'messageEdited' = 'messageEdited',
    'messageRead' = 'messageRead'
}

export enum EXCEPTION {
    'socket' = 'socket',
    'message' = 'message'
}