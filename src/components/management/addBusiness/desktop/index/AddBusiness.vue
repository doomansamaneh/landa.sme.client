<template>
  <q-card
    :class="{ 'card-desktop bordered q-my-xl': $q.screen.gt.xs, 'no-border no-shadow bg-transparent': $q.screen.lt.sm }"
  >
    <q-card-section v-if="$q.screen.gt.xs">
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ $t("pages.add-new-business") }}
          </q-item-label>
          <q-item-label class="text-body2 caption-on-dark">
            {{ $t("page.add-business.caption") }}
          </q-item-label>
        </q-item-section>
        <q-card-actions class="no-padding">
          <div class="flex items-center ">
            <back-button />
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-separator v-if="$q.screen.gt.xs" />

    <q-card-section :class="{ 'q-mx-md': $q.screen.gt.xs, 'no-padding': $q.screen.lt.sm }">
      <q-form
        ref="form"
        autofocus
        class="q-my-md"
      >
        <div>
          <q-item-label class="text-body2 caption-on-dark no-letter-spacing q-mb-sm">
            {{ $t("page.add-business.business-name-label") }}
          </q-item-label>
          <q-input
            dense
            hide-bottom-space
            outlined
            required
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            v-model="businessName"
          />
        </div>

        <div class="q-mt-lg">
          <select-plan />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions :class="{ 'q-px-none q-pt-none q-pb-lg': $q.screen.xs, 'bg-on-dark q-pa-lg': $q.screen.gt.xs }">
      <div class="row q-gutter-md items-center">
        <q-btn
          type="submit"
          @click="submitForm"
          unelevated
          rounded
          color="positive"
          no-caps
          padding="8px 16px"
        >
          <q-icon
            name="o_monetization_on"
            class="q-pr-xs"
            size="xs"
          />
          {{ $t("page.renew-subscription.buttons.payment") }}
        </q-btn>
        <span class="text-caption no-letter-spacing">
          {{ $t("page.add-business.pay-caption") }}
        </span>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
import { useQuasar } from "quasar"

import SelectPlan from "src/components/management/shared/SelectPlan.vue"
import BackButton from "src/components/shared/buttons/GoBackLink.vue"

const $q = useQuasar()

const businessName = ref("")
const form = ref(null)

const submitForm = () => {
  $q.notify({
    type: "positive",
    message: "عملیات با موفقیت انجام شد",
    timeout: 1500
  })
}
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}
</style>
