<template>
    <div class="usersearch">
        <SearchInput 
            placeholder="Поиск среди пользователей"  
            @input="text = $event.target?.value"
            @pressEnter="emit('enter')"
         />

    
        <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
            <a-spin class="dialogs__loading" v-if="isLoading" :indicator="indicator" />

            <a-empty v-else-if="isEmpty" class="dialogs__empty" :image="Empty.PRESENTED_IMAGE_SIMPLE">
                <template #description>
                    Нет Результатов
                </template>
            </a-empty>
            <div  v-else class="usersearch-list">
                <TransitionGroup enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                    <UserItem v-for="user in props.users" :key="user._id" :user="user" @click="emit('userSelect', user)" />
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';
import { IUser } from '~/types';

interface IProps {
    isLoading: boolean;
    users: IUser[] | undefined;
    text: string;
}

interface IEmit { 
    (event: 'enter'): void;
    (event: 'userSelect', user: IUser): void
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmit>();

const text = useVModel(props, 'text');

const indicator = h(LoadingOutlined, { spin: true})

const isEmpty = computed(() => !props.isLoading && !props.users?.length)
</script>

<style lang="scss" scoped>
.usersearch {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
}
.usersearch-list {
    height: 100%;
    max-height: 400px;
    overflow-y: auto;
}
</style>