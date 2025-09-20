<template>
  <!-- Desktop Toolbar -->
  <component
    v-if="$q.screen.gt.sm"
    :is="ToolbarDesktop"
    :title="$t('shared.labels.support')"
    :buttons="true"
    no-back-button
  >
    <template #buttons>
      <q-btn
        no-caps
        rounded
        unelevated
        color="primary"
        class="primary-shadow primary-gradient"
        @click="store.openNewTicketDialog"
      >
        <q-icon size="16px" class="q-mr-xs" name="o_add" />
        <div class="text-body2">
          {{ $t("shared.labels.registerNewTicket") }}
        </div>
      </q-btn>
      <q-btn
        no-caps
        rounded
        unelevated
        @click="store.openContactDialog"
      >
        <q-icon size="16px" class="q-mr-xs" name="phone" />
        <div class="text-body2">
          {{ $t("shared.labels.contactSupport") }}
        </div>
      </q-btn>
    </template>
  </component>

  <!-- Mobile Toolbar -->
  <component
    v-else
    :is="ToolbarMobile"
    :title="title"
    :buttons="true"
    no-back-button
  >
    <template #buttons>
      <q-btn dense round unelevated @click="store.openContactDialog">
        <q-icon size="20px" name="phone" />
      </q-btn>
    </template>
  </component>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { defineAsyncComponent } from "vue";
  import { useTickets } from "src/composables/useTickets.js";

  const ToolbarDesktop = defineAsyncComponent(() =>
    import("src/components/shared/toolbars/FormToolBarDesktop.vue")
  );

  const ToolbarMobile = defineAsyncComponent(() =>
    import("src/components/shared/toolbars/FormToolBarMobile.vue")
  );

  const $q = useQuasar();
  const store = useTickets();
</script>
