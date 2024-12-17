<template>
  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          نام
        </q-item-label>
        <custom-input
          hide-bottom-space
          v-model="formStore.model.value.name"
          :rules="[(val) => val !== null && val !== '']"
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          ایمیل
        </q-item-label>
        <custom-input
          hide-bottom-space
          v-model="formStore.model.value.email"
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          گروه‌های دسترسی کاربر
        </q-item-label>
        <div class="q-gutter-sm q-pt-xs">
          {{ roles }}
          <!-- <q-option-group
            inline
            options=""
            type="checkbox"
            v-model="dlTypes"
          /> -->
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useUserModel } from "../../../_composables/useUserModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

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

  onMounted(async () => {
    roles = await formStore.getRoles();
  });

  defineExpose({
    submitForm,
  });
</script>
