<template>
  <tool-bar :title="title" :submit-call-back="submitForm"> </tool-bar>

  <div class="form-container">
    <q-card>
      <q-card-section>
        <q-form ref="form" autofocus>
          <div class="row q-col-gutter-md q-mb-md">
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

          <div class="row q-col-gutter-md q-mb-md">
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

          <div class="row q-col-gutter-md q-mb-md">
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductGroupModel } from "components/areas/cmn/_composables/useProductGroupModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const route = useRoute();
const formStore = useProductGroupModel();

onMounted(() => {
  formStore.crudStore.getById(route.params.id);
});

async function submitForm() {
  const success = await form.value.validate();
  if (success) {
    return await formStore.crudStore.createOrEdit(props.action);
  } else {
    //todo: how to show validation message to user
    alert("validation error");
  }
}
</script>
