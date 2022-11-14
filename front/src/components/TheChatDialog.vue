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
                @copy="copy"
             />
            <TheChatDialogInput 
                v-model:value="message" 
                v-model:fileList="fileList"
                :disabled="isDisabled"
                class="chat__dialogs-input" 
                @send="onSend" 
            />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { UploadFile } from 'ant-design-vue';
import { onBeforeRouteLeave } from 'vue-router';
import { scrollListToBottom } from '~/helpers';
import { useDialogs } from '~/hooks';
import {  IMessage, IUploadFile } from '~/types';
import {FileAPI} from '~/api';
import { AxiosError } from 'axios';
import { IMessageEmit } from '~/socket';

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
    getMessageText,
    readMessageAPI,
    isMe,
    getUserId,
} = useDialogs();

const dialogQuery = useDialogQuery();
const route = useRoute();
const router = useRouter();


const editedMessage = ref<IMessage | null>()
const message = ref<string>('');
const fileList = ref<IUploadFile[]>([]);
const isLoadingFile = ref<boolean>(false)
const messageElm = ref<HTMLDivElement>();
const messageViewIndex = ref<number>(0)

const {  copy } = useClipboard({ source: message })

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
const isHaveCurrentDialog = computed(() => Boolean(currentDialog.value));
const isDisabled = computed(() => !currentDialogId.value || isLoading.value || isLoadingFile.value)

watch(isError, notFound);
watchArray(fileList, (_, __, added) => loadFiles(added));

watch(messagesLength, (v) => {
    console.log('messages')
    nextTick(scrollToBottom);
    readLastMessage();
});

watch(isHaveCurrentDialog, () => readMessageAPI())

onMounted(mounted);
onBeforeRouteLeave((to, from, next) => {
    if(to.name != from.name) {
        currentDialogId.value = undefined;
    }
    
    next(true)
})

async function loadFiles(files: UploadFile[]) {
    try {
        isLoadingFile.value = true;
        await Promise.allSettled(files.map(loadFile))
    } finally{
        isLoadingFile.value = false;
    }
}

function notFound() {
    if(isError.value) {
        router.push({name: "Home"});
        currentDialogId.value = undefined;
    }
}

async function loadFile(fileReq: UploadFile) {
    try {
        const {data: file} = await FileAPI.uploadFile({
            id: fileReq.uid,
            file: fileReq.originFileObj as File
        });
        console.log('loadFile', file)
        fileReq.fileName = file.filename;
        fileReq.name = file.filename;
        fileReq.response = file;
        fileReq.url = file.orig_url;
        fileReq.preview = file.orig_url;
        fileReq.status = 'success';
        fileReq.size = file.size;
    } catch(e) {
        if(e instanceof AxiosError) {
            fileReq.error = e.response?.data;
        } 
        fileReq.status = 'error';
    }
}

function mounted() {
    messageElm.value = document.querySelector('.chat__dialogs-messages') as HTMLDivElement;

    notFound();

    showLastMessage();
    console.log('mounted', currentDialogId.value)
    if(currentDialogId.value) {
        dialogQuery.refetch.value();
    }
}

function showLastMessage() {
    if(!isError.value && data.value) {
        messageViewIndex.value = messages.value.length - 1;
    }
}

function readLastMessage() {
    const message = messages.value[messagesLength.value - 1];
    if(!message?.author) return;
    
    if(isMe.value(getUserId.value(message.author))) return;

    readMessageAPI(message._id);
}


function onSend(m: string) {
    if(isDisabled.value) return;

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

    const data: IMessageEmit = {
        message: {
            text: m
        },
        dialogId: currentDialogId.value as string
    }
    
    if(fileList.value.length) {
        data.message.attachments = fileList.value.map(f => f.uid);
    }


    messageEmit(data);
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