<template>
    <div class="error-offline-banner" v-if="showBanner">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated bounceInDown"
            :duration="1000">
            <q-banner inline-actions class="q-banner-error bg-yellow-1 text-dark">
                <q-icon name="public" size="22px" class="q-mr-xs" color="orange" />
                <span>
                    <strong class="q-pr-lg">{{alertStore.alert.status}}</strong>
                    <span>
                        {{ $t(alertStore.alert.message) }}
                    </span>
                </span>
                <template v-slot:action>
                    <q-icon @click="hideBanner" flat unelevated color="orange" name="close" class="cursor-pointer" />
                </template>
            </q-banner>
        </transition>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue"
    import { useAlertStore } from "stores"

    const alertStore = useAlertStore()

    const showBanner = computed(() => alertStore.alert && authStore.alert.showAlert)
    function hideBanner() {
        alertStore.alert.showAlert = false
    }
</script>

<style>
</style>