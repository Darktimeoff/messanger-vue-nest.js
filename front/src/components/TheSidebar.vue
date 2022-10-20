<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <TeamOutlined class="sidebar__header__icon" />
      <span class="sidebar__header__title">Список диалогов</span>
      <AppInlineIcon>
        <FormOutlined class="sidebar__header__icon" />
      </AppInlineIcon>
    </div>

    <TheSidebarSearch @input="onTextInput" />
    <TheDialogs :items="filtredItems" @selectDialog="currentDialogId = $event._id" :isLoading="isLoading"/>
  </div>
</template>

<script setup lang="ts">
import { TeamOutlined, FormOutlined } from '@ant-design/icons-vue';
import { useDialogs } from '~/hooks';

const { items, currentDialogId, useDialogsQuery, dialogPartner} = useDialogs()

const dialogsQuery = useDialogsQuery()

const searchV = ref('');

const filtredItems = computed(() => {
  return items.value?.filter(d => {
    const partner = dialogPartner.value(d);
    const result =  partner?.fullname.toLowerCase().includes(searchV.value.toLowerCase())
    console.log(searchV.value.toLowerCase(), result)
    return result;
  }) || []
})

const isLoading = computed(() => dialogsQuery.isLoading.value)

function onTextInput(e: InputEvent) {
  searchV.value = (e.target as HTMLInputElement).value || '';
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100%;
}
.sidebar__header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0 5px;
  border-bottom: 1px solid $divider;
  margin-bottom: px($chatPadding);
  margin-left: px(-20);
  margin-right: px(-20);
  padding: 0 px($chatPadding);
  padding-bottom: px($chatPadding);
}
.sidebar__header__icon{
    font-size: 12px;
}
</style>