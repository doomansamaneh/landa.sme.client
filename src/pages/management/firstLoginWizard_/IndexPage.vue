<template>
    <q-page :class="$q.screen.gt.sm ? 'row items-center justify-center overflow-hidden' : ''">
        <div :class="$q.screen.gt.xs ? 'main-container' : ''">
            <background v-if="$q.screen.gt.xs" />
            <index-view />
        </div>
    </q-page>
</template>

<script setup>
import Background from "src/assets/BusinessBackground.vue";
import IndexView from "src/components/management/business/FirstLoginWizard.vue"
</script>