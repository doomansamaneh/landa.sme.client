<template>
  <q-dialog v-model="store.congratsVisible.value">
    <q-card
      class="q-pa-lg q-rounded-xl"
      style="width: 560px; max-width: 95vw"
    >
      <q-card-section class="text-center q-pb-none">
        <q-icon name="celebration" size="64px" color="primary" />
        <div class="text-h6 q-mt-md text-weight-bold">
          تبریک! آماده‌ای از لاندا استفاده کنی
        </div>
        <div class="text-body2 q-mt-sm text-grey-7">
          همه مراحل آموزشی را با موفقیت گذراندی. حالا میتونی با خیال
          راحت شروع کنی.
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn
          padding="8px 16px"
          color="primary"
          rounded
          unelevated
          label="برو به پیشخوان"
          to="/dashboard"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useFirstUsageWizard } from "src/composables/useFirstUsageWizard";

  const store = useFirstUsageWizard();

  function onClose() {
    store.hideChecklistCongrats();
  }
</script>

<style scoped></style>
