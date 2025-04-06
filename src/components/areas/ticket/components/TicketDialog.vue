<template>
  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="column no-scroll">
      <div class="sticky-header">
        <q-card-section class="row items-center">
          <div class="text-h6">پشتیبانی</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none">
          <q-tabs
            v-model="activeTab"
            active-color="primary"
            indicator-color="primary"
            align="justify"
          >
            <q-tab name="new" label="تیکت جدید" />
            <q-tab name="list" label="تیکت‌های من" />
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
            <div class="row q-col-gutter-md full-height">
              <div class="col-12 col-md-4">
                <ticket-list
                  :tickets="tickets"
                  :selected-ticket="selectedTicket"
                  @select-ticket="selectedTicket = $event"
                />
              </div>

              <div class="col-12 col-md-8">
                <ticket-chat
                  :ticket="selectedTicket"
                  :messages="currentChatMessages"
                  @send-message="handleNewMessage"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useQuasar } from "quasar";
  import NewTicketForm from "./NewTicketForm.vue";
  import TicketList from "./TicketList.vue";
  import TicketChat from "./TicketChat.vue";
  import { useTicketModel } from "../_composables/useTicketModel";
  import { useTicketListModel } from "../_composables/useTicketListModel";

  defineProps({ modelValue: { type: Boolean, required: true } });
  const emit = defineEmits(["update:modelValue"]);

  const $q = useQuasar();
  const activeTab = ref("new");
  const selectedTicket = ref(null);
  const chatMessagesMap = ref(new Map());

  const ticketStore = useTicketModel();
  const ticketList = useTicketListModel();

  const ticketModel = computed(() => ticketStore.model.value);
  const tickets = computed(() => ticketList.tickets.value);
  const currentChatMessages = computed(() =>
    selectedTicket.value
      ? chatMessagesMap.value.get(selectedTicket.value.id) || []
      : []
  );

  watch(selectedTicket, (newTicket) => {
    if (newTicket && !chatMessagesMap.value.has(newTicket.id)) {
      chatMessagesMap.value.set(newTicket.id, []);
    }
  });

  async function onSubmit(form) {
    try {
      await ticketStore.submitForm(form, "create");
      $q.notify({
        type: "positive",
        message: "تیکت با موفقیت ثبت شد",
      });
      emit("update:modelValue", false);
      activeTab.value = "list";
      await ticketList.fetchTickets();
    } catch {
      $q.notify({ type: "negative", message: "خطا در ثبت تیکت" });
    }
  }

  function handleNewMessage(message) {
    if (!selectedTicket.value) return;
    const messages =
      chatMessagesMap.value.get(selectedTicket.value.id) || [];
    messages.push(message);
    chatMessagesMap.value.set(selectedTicket.value.id, messages);
  }
</script>

<style scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
