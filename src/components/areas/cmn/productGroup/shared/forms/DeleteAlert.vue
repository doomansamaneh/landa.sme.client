<template>
  <q-dialog
    ref="dialog"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <q-card
      class="dialog-card no-shadow"
      style="width:600px"
    >
      <q-card-section class="row items-center q-pl-lg q-pr-md">
        <div class="text-h6">
          پیغام تایید
        </div>
        <q-space />
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="q-px-sm q-mb-sm">اقدام شما منجر به حذف کامل اطلاعات می‌شود، آیا اطمینان حاصل می‌کنید؟</div>
      </q-card-section>
      <actions
        @ok-clicked="submitForm"
        class="q-px-lg"
      >
        <template #ok-label>تایید</template>
      </actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import Actions from "src/components/shared/Forms/FormCardActions.vue"

const dialog = ref(null);

const submitForm = () => {
  alert("Hello")
  dialog.value.hide();
};

</script>
