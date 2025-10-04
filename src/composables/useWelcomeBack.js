import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "src/stores";
import { useBusiness } from "src/stores/useBusiness";

export function useWelcomeBack() {
  const { t } = useI18n();
  const authStore = useAuthStore();
  const businessStore = useBusiness();

  const currentBusiness = computed(() => businessStore.get());
  const businessId = computed(() => currentBusiness.value?.id);

  const getWelcomeBackShownKey = (id) =>
    `welcomeBackShown_${id || "no-business"}`;

  const hasShownWelcomeBack = computed(() => {
    const currentBusinessId = businessId.value;
    return (
      sessionStorage.getItem(
        getWelcomeBackShownKey(currentBusinessId)
      ) === "true"
    );
  });

  const shouldShowWelcomeBack = computed(() => {
    if (hasShownWelcomeBack.value) return false;

    const user = authStore.currentUser;
    if (!user || !user.lastLoginDate) return false;

    try {
      const lastLoginDate = new Date(user.lastLoginDate);
      const currentDate = new Date();

      if (isNaN(lastLoginDate.getTime())) return false;

      const diffTime = currentDate - lastLoginDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 0;
    } catch (error) {
      console.error("Error parsing last login date:", error);
      return false;
    }
  });

  const markWelcomeBackAsShown = () => {
    const currentBusinessId = businessId.value;
    sessionStorage.setItem(
      getWelcomeBackShownKey(currentBusinessId),
      "true"
    );
  };

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
    markWelcomeBackAsShown,
    getDaysSinceLastLogin,
  };
}
