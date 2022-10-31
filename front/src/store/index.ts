import { createPinia } from 'pinia'
export * from './dialogs.store';
export * from './user.store';
export * from './modal.store';

export const store = createPinia();