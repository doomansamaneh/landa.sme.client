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
                عنوان
              </q-item-label>
              <custom-input
                hide-bottom-space
                v-model="formStore.model.value.title"
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-2 col-sm-6 col-xs-6">
              <q-item-label
                class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
              >
                تعداد اعشار
              </q-item-label>
              <custom-select
                v-model="formStore.model.value.precisionCount"
                :options="precisionCounts"
                :rules="[(val) => val !== null && val !== '']"
              />
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
import { useRouter } from "vue-router";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
import { precisionCounts } from "src/constants";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

const props = defineProps({
  action: String,
  title: String,
});

const router = useRouter();
const form = ref(null);
const formStore = useBaseInfoModel("cmn/location");

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
