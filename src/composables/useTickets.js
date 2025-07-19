import { ref } from "vue";
import { Notify, copyToClipboard } from "quasar";

const ticketState = ref({
  showNewTicketDialog: false,
  showContactDialog: false,
  ticketModel: {},
});

export function useTickets() {
  function openNewTicketDialog() {
    ticketState.value.showNewTicketDialog = true;
  }

  function closeNewTicketDialog() {
    ticketState.value.showNewTicketDialog = false;
  }

  function openContactDialog() {
    ticketState.value.showContactDialog = true;
  }

  function closeContactDialog() {
    ticketState.value.showContactDialog = false;
  }

  function copyNumberToClipboard() {
    const number = "02191070419";
    copyToClipboard(number)
      .then(() => {
        Notify.create({
          message: "تلفن کپی شد.",
          color: "positive",
          position: "top",
        });
      })
      .catch(() => {});
  }

  function resetTicketState() {
    ticketState.value.showNewTicketDialog = false;
    ticketState.value.showContactDialog = false;
    ticketState.value.ticketModel = {};
  }

  return {
    ticketState,

    openNewTicketDialog,
    closeNewTicketDialog,
    openContactDialog,
    closeContactDialog,
    copyNumberToClipboard,
    resetTicketState,
  };
}
