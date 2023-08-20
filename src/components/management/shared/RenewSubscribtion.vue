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
  </q-btn>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  title: String,
  businessId: String,
  planTitle: String
})

async function goToAddPayment() {
  router.push(`business/addPayment/${props.businessId}`)
}
</script>

<style></style>
