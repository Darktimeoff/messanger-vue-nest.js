<template>
    <div class="sidebar__search">
       <a-input placeholder="Поиск среди контактов">
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
</style>