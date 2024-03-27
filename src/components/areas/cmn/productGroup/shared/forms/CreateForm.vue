<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
  />

  <div class="form-container">
    <q-card>
      <q-card-section>
        <q-form ref="form" autofocus>
          <div class="row q-mb-md">
            <div class="col-md-2 col-sm-6 col-xs-6">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                کد
              </q-item-label>
              <custom-input
                v-model="formStore.model.value.code"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                عنوان
              </q-item-label>
              <custom-input
                v-model="formStore.model.value.title"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-checkbox
                v-model="formStore.model.value.isActive"
                label="فعال"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBaseInfoModel } from "components/areas/_shared/_composables/useBaseInfoModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useBaseInfoModel("cmn/productGroup");
</script>
