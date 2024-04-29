<template>
  <tool-bar
    :title="title"
    @submit-call-back="localFormStore.crudStore.submitForm(form, action)"
  />

    <q-card class="form-container">
      <q-card-section>
        <q-form ref="form" autofocus>
          <div v-if="hasCode" class="row q-col-gutter-md q-mb-md">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                کد
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="localFormStore.model.value.code"
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                عنوان
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="localFormStore.model.value.title"
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">
            <q-checkbox
              dense
              size="48px"
              v-model="localFormStore.model.value.isActive"
              label="فعال"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
</template>

<script setup>
import { ref, computed } from "vue";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

const props = defineProps({
  action: String,
  title: String,
  formStore: Object,
  hasCode: Boolean,
});

const form = ref(null);

const localFormStore = computed(() => props.formStore);
</script>
