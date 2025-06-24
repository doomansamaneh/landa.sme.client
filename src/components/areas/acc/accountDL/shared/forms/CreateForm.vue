<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input label="کد" v-model="model.code" required />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input label="کد معادل" v-model="model.syncCode" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              label="عنوان"
              v-model="model.title"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="model.isActive"
            label="فعال"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { accountDLModel } from "src/models/areas/acc/accountDLModel";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const model = ref({ ...accountDLModel });
  const formStore = useBaseInfoModel({
    baseRoute: "acc/accountDL",
    model: model,
  });
</script>
