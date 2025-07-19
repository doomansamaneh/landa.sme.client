<template>
  <q-dialog
    v-model="store.ticketState.value.showContactDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 480px">
      <q-card-section>
        <q-item
          @click="store.copyNumberToClipboard"
          clickable
          class="bordered border-radius-sm"
        >
          <q-item-section class="flex items-center justify-between">
            <div class="text-body1">تلفن واحد پشتیبانی:</div>
            <div class="text-h6">02191070419</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          href="tel:02191070419"
          class="primary-shadow primary-gradient text-white"
          padding="6px 12px"
          rounded
          unelevated
        >
          <q-icon size="16px" class="q-mr-xs" name="phone" />
          <div class="text-body2">تماس</div>
        </q-btn>

        <q-btn
          rounded
          unelevated
          v-close-popup
          padding="6px 12px"
          @click="store.closeContactDialog"
        >
          <div class="text-body2">بستن</div>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useTickets } from "src/composables/useTickets.js";

  const store = useTickets();
</script>
