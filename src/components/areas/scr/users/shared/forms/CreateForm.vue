<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form)"
  />
  <q-card class="form-container" style="margin-top: 16px">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input
              label="نام"
              v-model="formStore.model.value.name"
              required
            />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <custom-input
              label="ایمیل"
              v-model="formStore.model.value.email"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <custom-label label="گروه‌های دسترسی کاربر" />
            <div class="q-gutter-sm q-pt-xs">
              <q-option-group
                type="checkbox"
                inline_
                v-model="formStore.model.value.roles"
                :options="mappedRoles"
              />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import { useUserModel } from "../../../_composables/useUserModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomLabel from "src/components/shared/forms/CustomLabel.vue";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";

  const props = defineProps({
    action: String,
    title: String,
    id: String,
  });

  const form = ref(null);

  const formStore = useUserModel({
    baseRoute: "scr/users",
    id: props.id,
  });

  const submitForm = () => {
    formStore.submitForm();
  };

  const roles = ref([]);

  const mappedRoles = computed(() =>
    roles.value.map((item) => ({
      label: item.title,
      value: item.id,
    }))
  );

  onMounted(async () => {
    roles.value = await formStore.getRoles();
  });

  defineExpose({
    submitForm,
  });
</script>
