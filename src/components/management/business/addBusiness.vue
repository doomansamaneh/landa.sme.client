<template>
  <q-card class="card-desktop no-shadow q-my-xl">
    <q-card-section>
      <q-item class="">
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("page.add-business.title")
          }}</q-item-label>
          <q-item-label class="dark-2 text-subtitle2">
            {{ $t("page.add-business.caption") }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-mx-md">
      <q-form ref="form" autofocus>
        <div class="row items-center q-mt-xs">
          <div class="col-2">
            <q-item-label class="q-mb-lg">{{
              $t("page.add-business.business-name-label")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <q-input
              dense
              outlined
              required
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              v-model="businessName"
              class="input"
            />
          </div>
        </div>

        <select-plan />
      </q-form>
    </q-card-section>

    <q-card-actions class="dark-1 q-pa-lg">
      <q-btn
        type="submit"
        @click="submitForm"
        unelevated
        rounded
        color="positive"
        no-caps
        padding="8px 16px"
        class=""
        ><q-icon name="o_monetization_on" class="q-pr-xs" size="xs" />
        {{ $t("page.renew-subscription.buttons.payment") }}
      </q-btn>
      <span class="text-caption q-pl-md">{{
        $t("page.add-business.pay-caption")
      }}</span>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue"
import { useQuasar } from "quasar"
import { fetchWrapper } from "src/helpers"
import SelectPlan from "src/components/management/shared/SelectPlan.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"

const $q = useQuasar()

const shape = ref("line")
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

.period-select {
  width: 400px;
}

.total {
  border-radius: 4px;
  height: 300px;
}

th,
td {
  padding: 16px 16px;
}

table {
  border-collapse: collapse;
  border: none;
}

.input {
  width: 400px;
}

.selected-row {
  background-color: #f4fcd1 !important;
}

tbody tr:hover {
  background-color: #f3f3f3;
}

.sadad {
  border-radius: 4px;
}

// .glass {
//   background: #ffffff33;
//   border-radius: 4px;
//   box-shadow: 0 2px 20px #0000001a;
//   backdrop-filter: blur(4px);
//   -webkit-backdrop-filter: blur(5px);
//   border: 1px solid #ffffff4d;
// }

.required-label {
  margin-bottom: 20px;
}
</style>
