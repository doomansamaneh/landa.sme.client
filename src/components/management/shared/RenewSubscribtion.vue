<template>
  <q-btn
    rounded
    class="text-caption_ q-px-sm q-py-xs"
    size="11px"
    no-caps
    filled
    unelevated
  >
    <q-icon name="add" class="q-pr-xs" size="14px" />
    {{ $t("page.buttons.renew-subscription") }}
    <q-tooltip class="custom-tooltip" delay="600">{{
      $t("page.buttons.renew-subscription")
    }}</q-tooltip>
  </q-btn>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  title: String,
  businessId: String
})

const router = useRouter()
</script>

<style></style>
