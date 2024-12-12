<template>
  <form-toolbar-container
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="q-mt-xl tips">
    <q-card-section>
      <div class="title">نکته</div>
      <div class="text-body1 no-letter-spacing q-mt-sm">
        تاریخ آغاز سال مالی، یک نوروز و تاریخ پایان سال مالی، پایان
        اسفند است.
      </div>
    </q-card-section>
  </q-card>
  <q-card class="form-container" style="margin-top: 16px">
    <q-card-section>
      <q-form ref="form" autofocus>
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
    baseRoute: "acc/fiscalYear",
    getCreateModel: true,
  });
</script>
