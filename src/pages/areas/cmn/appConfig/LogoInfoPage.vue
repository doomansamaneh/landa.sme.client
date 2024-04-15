<template>
    <div :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''">
        <div>
            <div>
                <div class="row items-center justify-between q-mb-md">
                    <div class="text-h6 text-weight-700 no-letter-spacing">لوگو</div>
                    <back-button />
                </div>
                <index-view />
            </div>


        </div>
    </div>
</template>


<script setup>
import IndexView from "src/components/areas/cmn/appConfig/LogoInfo.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue";
</script>
