import { ref, onMounted, onUnmounted } from "vue";
import { Notify, copyToClipboard } from "quasar";
import {
  phoneNumbers,
  defaultPageSize,
  sortOrder,
} from "src/constants";
import { fetchWrapper } from "src/helpers";
import { usePolling } from "src/composables/usePolling";

const ticketState = ref({
  showNewTicketDialog: false,
  showContactDialog: false,
  ticketModel: {},
});

// Ticket list state
const loadableDataGrid = ref(null);
const selectedTicket = ref(null);
const showChat = ref(false);
const chatContainerDesktop = ref(null);
const chatContainerMobile = ref(null);

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
    const number = phoneNumbers.support;
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

  function triggerTicketSubmitted() {
    // Refresh the data grid when a ticket is submitted
    if (loadableDataGrid.value?.loadData) {
      loadableDataGrid.value.loadData();
    }
  }

  // Polling for unread count updates
  const checkUnreadCount = async () => {
    try {
      // Get current pagination from the data grid
      const currentPagination = loadableDataGrid.value?.tableStore
        ?.pagination?.value || {
        currentPage: 1,
        pageSize: defaultPageSize,
        sortColumn: "dateCreated",
        sortOrder: sortOrder.descending,
      };

      // Use silent parameter to avoid showing loading indicators
      const response = await fetchWrapper.post(
        "business/getFeedbackGridData",
        currentPagination,
        true // silent parameter
      );

      if (response?.data?.data?.items) {
        // Update unread counts without triggering full reload
        const newItems = response.data.data.items;
        // Access the gridStore rows which contain the displayed data
        const currentItems =
          loadableDataGrid.value?.tableStore?.store?.rows?.value ||
          [];

        // Update unread counts for existing items
        currentItems.forEach((currentItem, index) => {
          const newItem = newItems.find(
            (item) => item.id === currentItem.id
          );
          if (
            newItem &&
            newItem.unreadCount !== currentItem.unreadCount
          ) {
            currentItems[index].unreadCount = newItem.unreadCount;
          }
        });
      }
    } catch (error) {
      console.error("Error checking unread count:", error);
    }
  };

  // Initialize polling with 5 second interval
  const { start: startPolling, clear: stopPolling } = usePolling(
    checkUnreadCount,
    5000 // 5 seconds
  );

  const selectTicket = async (item) => {
    selectedTicket.value = item.id;
    // This will be handled by the component that uses this composable
  };

  const statusColors = {
    1: "orange",
    2: "blue",
    3: "red",
    4: "green",
  };

  function getStatusColor(value) {
    return statusColors[value] || "grey";
  }

  function initializeTicketList() {
    if (loadableDataGrid.value?.loadData) {
      loadableDataGrid.value.loadData();
    }
    startPolling();
  }

  function cleanupTicketList() {
    stopPolling();
  }

  return {
    // State
    ticketState,
    loadableDataGrid,
    selectedTicket,
    showChat,
    chatContainerDesktop,
    chatContainerMobile,

    // Dialog methods
    openNewTicketDialog,
    closeNewTicketDialog,
    openContactDialog,
    closeContactDialog,
    copyNumberToClipboard,
    resetTicketState,

    // Ticket list methods
    selectTicket,
    getStatusColor,
    initializeTicketList,
    cleanupTicketList,
    triggerTicketSubmitted,
  };
}
