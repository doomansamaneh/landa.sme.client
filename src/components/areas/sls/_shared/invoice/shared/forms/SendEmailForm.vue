<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        گیرنده
      </q-item-label>
      <custom-input
        style="direction: ltr"
        hide-bottom-space
        v-model="emailStore.model.value.receiverEmail"
        :rules="[(val) => val !== null && val !== '']"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        سایر گیرندگان
      </q-item-label>
      <custom-input
        style="direction: ltr"
        hide-bottom-space
        v-model="emailStore.model.value.receivers"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        موضوع
      </q-item-label>
      <custom-input
        hide-bottom-space
        v-model="emailStore.model.value.subject"
        :rules="[(val) => val !== null && val !== '']"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        متن
      </q-item-label>
      <custom-input
        hide-bottom-space
        type="textarea"
        v-model="emailStore.model.value.content"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useSendEmail } from "src/components/areas/sls/_composables/useSendEmail";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    id: String,
    baseRoute: String,
  });

  const emailStore = useSendEmail({
    baseRoute: props.baseRoute,
    id: props.id,
  });
  const form = ref(null);

  async function submitForm() {
    try {
      const isValid = await form.value.validate();

      if (isValid) {
        await emailStore.sendEmail();
        return true;
      } else {
        // alert("Validation error");
        return false;
      }
    } catch (error) {
      console.error("Error during sending mail submission:", error);
      return false;
    }
  }

  onMounted(() => {
    emailStore.getEmail();
  });

  defineExpose({
    submitForm,
  });
</script>
