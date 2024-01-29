<template>
  <tmplate v-if="$q.screen.gt.xs">
    <q-btn
      v-if="showLink"
      class="text-body3 no-letter-spacing"
      :to="addPaymentUrl"
      rounded
      no-caps
      color="green"
      unelevated
      padding="6px 12px"
    >
      <q-icon
        name="add"
        class="q-pr-xs"
        size="16px"
      />
      {{ $t("pages.renew-subscription") }}
    </q-btn>
  </tmplate>

  <template v-if="$q.screen.lt.sm">
    <q-btn
      v-if="showLink"
      class="text-caption-sm no-letter-spacing green-shadow"
      :to="addPaymentUrl"
      rounded
      padding="4px 8px"
      no-caps
      color="green"
      dense
      unelevated
    >
      <span class="text-caption-sm">تمدید</span>
    </q-btn>

  </template>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  business: Object
})

const addPaymentUrl = computed(
  () => `/business/addPayment/${props.business?.id}`
)
const showLink = computed(
  () => props.business?.isOwner && props.business?.daysToExpire < 300
)
</script>

