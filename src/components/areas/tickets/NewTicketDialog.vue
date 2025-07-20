<template>
  <q-dialog
    v-model="store.ticketState.value.showNewTicketDialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="400"
    no-backdrop-dismiss
  >
    <q-card
      class="bg-main"
      :class="$q.screen.lt.md ? 'hide-scrollbar' : ''"
    >
      <!-- Header Section -->
      <q-card-section class="bg-primary text-white">
        <div class="row justify-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="row items-center justify-between">
              <div class="row items-center q-gutter-sm">
                <q-avatar
                  size="40px"
                  class="bg-white text-primary shadow-2"
                  icon="o_support_agent"
                />
                <div>
                  <div class="text-h6 text-weight-medium">
                    {{ $t("shared.labels.registerNewTicket") }}
                  </div>
                  <div class="text-caption text-grey-3">
                    {{ $t("shared.labels.enterTicketInformation") }}
                  </div>
                </div>
              </div>
              <q-btn
                no-caps
                icon="close"
                flat
                round
                dense
                class="text-white"
                @click="store.closeNewTicketDialog"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- Content Section -->
      <q-card-section>
        <div class="row justify-center">
          <div class="col-12 col-md-8 col-lg-6">
            <new-ticket-form />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useTickets } from "src/composables/useTickets.js";
  import NewTicketForm from "./NewTicketForm.vue";

  const store = useTickets();
</script>
