import { computed } from "vue";
import { useAuthStore } from "src/stores";

export function useWelcomeBack() {
  const authStore = useAuthStore();
  const distance = 25;

  const shouldShowWelcomeBack = computed(() => {
    const days = getDaysSinceLastLogin();
    return days > distance;
  });

  const getDaysSinceLastLogin = () => {
    const user = authStore.currentUser;
    if (!user || !user.lastLoginDate) return 0;

    try {
      const lastLoginDate = new Date(user.lastLoginDate);
      const currentDate = new Date();

      if (isNaN(lastLoginDate.getTime())) return 0;

      const diffTime = currentDate - lastLoginDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    } catch (error) {
      return 0;
    }
  };

  return {
    shouldShowWelcomeBack,
    getDaysSinceLastLogin,
  };
}
