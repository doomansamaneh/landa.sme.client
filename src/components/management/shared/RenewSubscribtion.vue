<template>
  <q-btn
    rounded
    class=""
    size="11px"
    no-caps
    filled
    unelevated
    padding="6px 12px"
    @click="goToAddPayment"
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

async function goToAddPayment() {
  router.push(`business/addPayment/${props.businessId}/${props.title}`)
}

const router = useRouter()
</script>

<style></style>
