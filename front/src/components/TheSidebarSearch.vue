<template>
    <div class="sidebar__search">
       <a-input class="sidebar__search-input" placeholder="Поиск среди контактов">
            <template #prefix>
                <SearchOutlined class="sidebar__search__icon" />
            </template>
        </a-input>
    </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
.sidebar__search__icon {
    opacity: $opDis;
}
.sidebar__search-input {
   background: #f7f8f9;
   height: 36px;
  &:not(.ant-input-affix-wrapper-focused) {
    border: 1px solid transparent;
  }
   &:deep(input) {
    background: #f7f8f9;
   }
}
</style>