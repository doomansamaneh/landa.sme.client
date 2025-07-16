<template>
  <q-page>
    <FormToolbarDesktop v-if="$q.screen.gt.sm" :title="'پشتیبانی'">
      <template #buttons>
        <q-btn
          rounded
          unelevated
          color="primary"
          class="primary-shadow primary-gradient"
          @click="showNewTicketDialog = true"
        >
          <q-icon size="16px" class="q-mr-xs" name="o_add" />
          <div class="text-body2">ثبت تیکت جدید</div>
        </q-btn>
        <q-btn rounded unelevated @click="showContactDialog = true">
          <q-icon size="16px" class="q-mr-xs" name="phone" />
          <div class="text-body2">تماس با واحد فروش</div>
        </q-btn>
      </template>
    </FormToolbarDesktop>

    <FormToolbarMobile v-else :title="'پشتیبانی'" buttons>
      <template #buttons>
        <q-btn
          round
          unelevated
          color="primary"
          class="primary-shadow primary-gradient"
          @click="showNewTicketDialog = true"
        >
          <q-icon size="24px" name="o_add" />
        </q-btn>
        <q-btn round unelevated @click="showContactDialog = true">
          <q-icon size="24px" name="phone" />
        </q-btn>
        <q-btn
          no-caps
          icon="close"
          flat
          round
          dense
          v-close-popup
          class="q-ml-sm"
        />
      </template>
    </FormToolbarMobile>
    <TicketList />

    <q-dialog
      v-model="showNewTicketDialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">ثبت تیکت جدید</div>
          <q-space />
          <q-btn
            no-caps
            icon="close"
            flat
            round
            dense
            @click="showNewTicketDialog = false"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <new-ticket-form
            :ticket-model="ticketModel"
            @submit="handleNewTicketSubmit"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showContactDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 480px">
        <q-card-section>
          <q-item
            @click="copyNumberToClipboard"
            clickable
            class="bordered border-radius-sm"
          >
            <q-item-section class="flex items-center justify-between">
              <div class="text-body1">تلفن واحد فروش:</div>
              <div class="text-h6">09124593902</div>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            href="tel:09124593902"
            class="primary-shadow primary-gradient text-white"
            padding="6px 12px"
            rounded
            unelevated
          >
            <q-icon size="16px" class="q-mr-xs" name="phone" />
            <div class="text-body2">تماس</div>
          </q-btn>

          <q-btn rounded unelevated v-close-popup padding="6px 12px">
            <div class="text-body2">بستن</div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
  import { ref } from "vue";
  import { Notify, copyToClipboard } from "quasar";

  import FormToolbarDesktop from "src/components/shared/toolbars/FormToolbarDesktop.vue";
  import FormToolbarMobile from "src/components/shared/toolbars/FormToolbarMobile.vue";
  import TicketList from "src/components/areas/ticket/components/TicketList.vue";
  import NewTicketForm from "src/components/areas/ticket/components/NewTicketForm.vue";

  const showNewTicketDialog = ref(false);
  const showTicketDialog = ref(true);
  const showContactDialog = ref(false);

  function handleNewTicketSubmit() {
    showNewTicketDialog.value = false;
    showTicketDialog.value = false;
  }

  function copyNumberToClipboard() {
    const number = "09124593902";
    copyToClipboard(number)
      .then(() => {
        Notify.create({
          message: "تلفن واحد فروش کپی شد.",
          color: "positive",
          position: "top",
        });
      })
      .catch(() => {});
  }
</script>

<style lang="scss" scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
