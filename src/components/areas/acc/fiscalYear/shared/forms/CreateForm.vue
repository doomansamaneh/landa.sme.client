<template>
  <tool-bar :title="title" :submit-call-back="submitForm"> </tool-bar>

  <div class="form-container">
    <q-card>
      <q-card-section>
        <q-form ref="form" autofocus>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                سال مالی
              </q-item-label>
              <custom-input
                type="number"
                hide-bottom-space
                v-model="formStore.model.value.year"
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-3 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                از تاریخ
              </q-item-label>
              <date-time v-model="formStore.model.value.fromDate" />
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                تا تاریخ
              </q-item-label>
              <date-time v-model="formStore.model.value.toDate" />
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">
            <q-checkbox
              dense
              size="48px"
              v-model="formStore.model.value.isActive"
              label="فعال"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { productType } from "src/constants";
import { helper } from "src/helpers";
import { useFiscalYearModel } from "src/components/areas/acc/_composables/useFiscalYearModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useFiscalYearModel();

async function submitForm() {
  await form.value.validate().then(async (success) => {
    if (success) {
      const responseData = await formStore.crudStore.createOrEdit(props.action);
      if (responseData?.code === 200) router.back();
    } else {
      //todo: how to show validation message to user
      alert("validation error");
    }
  });
}
</script>
