<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شماره
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.no"
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شناسه مالیاتی
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.taxCode"
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
              تاریخ شروع
            </q-item-label>
            <date-time v-model="formStore.model.value.startDate" />
          </div>
          <div class="col-md-2 col-sm-6 col-xs-6">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              تاریخ پایان
            </q-item-label>
            <date-time v-model="formStore.model.value.finishDate" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شرح
            </q-item-label>
            <custom-input
              type="textarea"
              v-model="formStore.model.value.comment"
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
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "doc/contract",
  });
</script>
