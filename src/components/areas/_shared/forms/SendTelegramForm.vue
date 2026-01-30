<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        شماره تلفن گیرنده
      </q-item-label>
      <custom-input
        style="direction: ltr"
        hide-bottom-space
        v-model="telegramStore.model.value.receiverPhone"
        :rules="[(val) => val !== null && val !== '']"
        placeholder="09123456789"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        پیام (اختیاری)
      </q-item-label>
      <custom-input
        hide-bottom-space
        type="textarea"
        v-model="telegramStore.model.value.message"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useSendTelegram } from "src/components/areas/_shared/_composables/useSendTelegram";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    id: String,
    baseRoute: String,
  });

  const telegramStore = useSendTelegram({
    baseRoute: props.baseRoute,
    id: props.id,
  });
  const form = ref(null);

  async function submitForm() {
    try {
      const isValid = await form.value.validate();

      if (isValid) {
        await telegramStore.sendTelegram();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during sending Telegram submission:", error);
      return false;
    }
  }

  onMounted(() => {
    telegramStore.getTelegram();
  });

  defineExpose({
    submitForm,
  });
</script>
