<template>
  <q-dialog
    v-model="showTicketDialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="column no-scroll">
      <div class="sticky-header">
        <q-card-section class="row items-center bg-main">
          <div v-if="$q.screen.gt.md" class="flex items-center q-gutter-sm">
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

            <q-btn
              rounded
              unelevated
              @click="showContactDialog = true"
            >
              <q-icon size="16px" class="q-mr-xs" name="phone" />
              <div class="text-body2">تماس با واحد فروش</div>
            </q-btn>
          </div>

          <div v-else class="flex items-center q-gutter-sm bg-main">
            <q-btn
              round
              unelevated
              color="primary"
              class="primary-shadow primary-gradient"
              @click="showNewTicketDialog = true"
            >
              <q-icon size="24px"  name="o_add" />
            </q-btn>

            <q-btn
              round
              unelevated
              @click="showContactDialog = true"
            >
              <q-icon size="24px" name="phone" />
            </q-btn>
          </div>

          <q-space v-if="$q.screen.gt.md" />


          <q-space v-if="$q.screen.lt.md" />

          <div class="text-h6">پشتیبانی</div>


          <q-btn
            no-caps
            icon="close"
            flat
            round
            dense
            v-close-popup
            class="q-ml-sm"
          />
        </q-card-section>

        <q-separator />
      </div>

      <q-card-section class="col no-scroll">

        <ticket-list />
      </q-card-section>
    </q-card>

    <!-- New Ticket Dialog -->
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
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { Notify } from "quasar";

  import NewTicketForm from "./NewTicketForm.vue";
  import TicketList from "./TicketList.vue";
  import { copyToClipboard } from "quasar";

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

<style scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
