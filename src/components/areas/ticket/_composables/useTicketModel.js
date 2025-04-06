import { ref } from "vue";
import {
  ticketModel,
  staticTickets,
} from "src/models/areas/ticket/ticketModel";

export function useTicketModel(config = {}) {
  const model = config?.model ?? ref(ticketModel);

  async function getById(id, action) {
    if (id) {
      const ticket = staticTickets.find((t) => t.id === id);
      if (ticket) {
        model.value = { ...ticket };
      }
    }
    return model.value;
  }

  async function submitForm(form, action) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTicket = {
      ...model.value,
      id: staticTickets.length + 1,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
    };

    staticTickets.unshift(newTicket);

    return { data: newTicket };
  }

  return {
    model,
    getById,
    submitForm,
  };
}
