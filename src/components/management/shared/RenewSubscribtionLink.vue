<template>
  <q-btn
    v-bind="showLink"
    rounded
    size="11px"
    no-caps
    filled
    unelevated
    padding="6px 12px"
  >
    <router-link :to="addPaymentUrl">
      <q-icon name="add" class="q-pr-xs" size="14px" />
      {{ $t("page.buttons.renew-subscription") }}
    </router-link>
  </q-btn>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  business: Object
})

const addPaymentUrl = computed(
  () => `/business/addPayment/${props.business.id}`
)
const showLink = computed(
  () => props.business.isOwner && props.business.daysToExpire < 350
)
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
