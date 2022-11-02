<template>
    <Transition enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
        <div class="chat__dialog">
            <div class="chat__dialog-header">
                <div class="chat__dialog-header-center">
                    <div class="chat__dialog-header-username">
                        {{dialogName}}
                    </div>
                    <Status class="chat__dialog-header-status" :online="isOnline"/>
                </div>
                <div class="chat__dialog-header-end">
                    <AppInlineIcon>
                        <EllipsisOutlined class="chat__dialog-header-icon" />
                    </AppInlineIcon>
                </div>
            </div>
            <TheChatDialogMessages 
                v-model:indexView="messageViewIndex" 
                :items="messages" 
                class="chat__dialogs-messages" 
                :isLoading="isLoading"
                @delete="removeMessageAPI"
                @edit="onEditMessage"
             />
            <TheChatDialogInput 
                v-model:value="message" 
                class="chat__dialogs-input" 
                @send="onSend" 
            />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { scrollListToBottom } from '~/helpers';
import { useDialogs } from '~/hooks';
import { IMessage } from '~/types';

const {
    messages,  
    currentDialog, 
    useDialogQuery, 
    getDialogName, 
    currentDialogId, 
    dialogPartner, 
    messageEmit,
    removeMessageAPI,
    editedMessageAPI,
    getMessageText
} = useDialogs();

const dialogQuery = useDialogQuery();
const route = useRoute();
const router = useRouter();

const editedMessage = ref<IMessage | null>()
const message = ref<string>('');
const messageElm = ref<HTMLDivElement>();
const messageViewIndex = ref<number>(0)

currentDialogId.value = route.params.id as string;

const isLoading = computed(() => {
    return dialogQuery.isFetching.value
});
const isError = computed(() => {
    return dialogQuery.isError.value;
})

const dialogName = computed(() => (currentDialog.value && getDialogName.value(currentDialog.value)) || '');
const partner  = computed(() => currentDialog.value && dialogPartner.value(currentDialog.value));
const isOnline = computed(() => partner.value?.isOnline);
const data = computed(() => dialogQuery.data.value);
const messagesLength = computed(() => messages.value.length);

watch(isError, notFound);

watch(messagesLength, (v) => {
    console.log('messages')
    nextTick(scrollToBottom)
});

onMounted(mounted);

function notFound() {
    if(isError.value) {
        router.push({name: "Home"});
        currentDialogId.value = undefined;
    }
}

function mounted() {
    messageElm.value = document.querySelector('.chat__dialogs-messages') as HTMLDivElement;

    notFound();

    showLastMessage();

    if(currentDialogId.value) dialogQuery.refetch.value();
}

function showLastMessage() {
    if(!isError.value && data.value) {
        messageViewIndex.value = messages.value.length - 1;
    }
}


function onSend(m: string) {
    if(!currentDialogId.value) return;
    if(!m.trim()) {
        editedMessage.value = null;
        return;
    };

    if(editedMessage.value) {
        editedMessageAPI({
            ...editedMessage.value,
            text: message.value
        })

        editedMessage.value = null;
        return;
    }
  
    messageEmit({
        message: {
            text: m
        },
        dialogId: currentDialogId.value
    });
}
function scrollToBottom() {
    const scroll = document.querySelector('.chat__dialogs-messages') as HTMLDivElement;
    scrollListToBottom(scroll)
}

function onEditMessage(m: IMessage) {
    editedMessage.value = m;
    message.value = getMessageText.value(m);
}
</script>

<style lang="scss" scoped>
.chat__dialog {
    height: 100%;
}
.chat__dialog-header {
    width: 100%;
    display: grid;
    grid-area: header;
    grid-template-areas:
        ". center end"
    ;
    align-items: center;
    border-bottom: 1px solid $divider;
    padding: px($chatPadding - 8);
    height: px($chatDialogHeaderH);
}
.chat__dialog-header-center {
    grid-area: center;
    justify-self: center;
    text-align: center;
}
.chat__dialog-header-end {
    grid-area: end;
    justify-self: end;
}
.chat__dialog-header-icon {
    font-size: 22px;
}
.chat__dialog-header-username {
    line-height: normal;
    font-weight: 500;
}
.chat__dialogs-messages {
    grid-area: message;
}
.chat__dialogs-input {
    grid-area: input;
}

.chat__dialog {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "header"
    "message"
    "input"
    ;
}
</style>