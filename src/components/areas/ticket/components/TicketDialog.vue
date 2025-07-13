<template>
  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="column no-scroll">
      <div class="sticky-header">
        <q-card-section class="row items-center">
          <div class="text-h6">پشتیبانی</div>
          <q-space />
          <q-btn
            no-caps
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none">
          <q-tabs
            v-model="activeTab"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            active-class="primary-gradient-1"
          >
            <q-tab name="new">
              <template #default>
                <div class="text-body1 text-weight-500">
                  تیکت جدید
                </div>
              </template>
            </q-tab>
            <q-tab name="list">
              <template #default>
                <div class="text-body1 text-weight-500">
                  تیکت‌های من
                </div>
              </template>
            </q-tab>
          </q-tabs>
        </q-card-section>

        <q-separator />
      </div>

      <q-card-section class="col no-scroll">
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="new">
            <new-ticket-form
              :ticket-model="ticketModel"
              @submit="onSubmit"
            />
          </q-tab-panel>

          <q-tab-panel name="list">
            <ticket-list />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";

  import NewTicketForm from "./NewTicketForm.vue";
  import TicketList from "./TicketList.vue";

  const activeTab = ref("new");
</script>

<style scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
