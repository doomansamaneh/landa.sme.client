<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
  />

  <div class="form-container">
    <q-card>
      <q-card-section>
        <q-form ref="form" autofocus>
          <div class="q-mb-md q-pa-md bordered_border-radius-sm">
            <h5 class="text-primary">نکته</h5>
            <p class="q-mt-md">
              تاریخ آغاز سال مالی، اولین روز سال و تاریخ پایان سال مالی روز
              پایانی سال است
            </p>
          </div>
          <div class="row q-mb-md">
            <div class="col-md-3 col-sm-12 col-xs-12">
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

          <div class="row q-mb-md">
            <div class="col-md-3 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                از تاریخ
              </q-item-label>
              <date-time v-model="formStore.model.value.fromDate" />
            </div>
          </div>
          <div class="row q-mb-md">
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
import { ref } from "vue";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useBaseInfoModel("acc/fiscalYear", null, true);
</script>
