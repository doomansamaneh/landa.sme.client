<template>
    <div v-if="showBanner">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated bounceInDown"
            :duration="1000">
            <q-banner inline-actions class="q-banner-error bg-yellow-1 text-dark">
                <q-icon name="public" size="22px" class="q-mr-xs" color="orange" />
                <span>
                    <strong class="q-pf-lg">{{status}}</strong>
                    <span>
                        {{ $t(message) }}
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

    const showBanner = computed(() => alertStore.showAlert())
    const status = computed(() => alertStore.alert != null ? alertStore.alert.status : 0)
    const message = computed(() => alertStore.alert != null ? alertStore.alert.message : "")

    function hideBanner() {
        alertStore.hide()
    }
</script>

<style>
</style>