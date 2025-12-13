import { ref } from "vue";
import { useGetActions } from "./useGetActions";

const unreadCount = ref(0);

export function useUnreadMessage() {
  const formStore = useGetActions("business");
  let loading = false;

  // Fetch unread message count
  const getUnreadMessageCount = async (silent = true) => {
    if (loading) return unreadCount.value;
    loading = true;

    try {
      const data = await formStore.getCustomApi(
        "getUnreadMessageCount",
        silent
      );
      unreadCount.value = data?.data ?? 0;
      return unreadCount.value;
    } catch {
      return unreadCount.value;
    } finally {
      loading = false;
    }
  };

  return {
    unreadCount,
    getUnreadMessageCount,
  };
}
