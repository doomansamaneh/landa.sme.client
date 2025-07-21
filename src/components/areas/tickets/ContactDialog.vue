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
            <div class="text-body1">
              {{ t("shared.labels.supportPhone") }}
            </div>
            <div class="text-h6">{{ phoneNumbers.support }}</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          :href="`tel:${phoneNumbers.support}`"
          class="primary-shadow primary-gradient text-white"
          padding="6px 12px"
          rounded
          unelevated
        >
          <q-icon size="16px" class="q-mr-xs" name="phone" />
          <div class="text-body2">{{ t("shared.labels.call") }}</div>
        </q-btn>

        <q-btn
          rounded
          unelevated
          v-close-popup
          padding="6px 12px"
          @click="store.closeContactDialog"
        >
          <div class="text-body2">{{ t("shared.labels.close") }}</div>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useI18n } from "vue-i18n";
  import { phoneNumbers } from "src/constants";
  import { useTickets } from "src/composables/useTickets.js";

  const { t } = useI18n();
  const store = useTickets();
</script>
