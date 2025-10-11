import { computed } from "vue";
import { useAuthStore } from "src/stores";

export function useAnniversary() {
  const authStore = useAuthStore();

  const shouldShowAnniversary = computed(() => {
    const user = authStore.currentUser;
    if (!user || !user.dateCreated) return false;

    // Check if anniversary was already shown this year
    if (user.anniversaryShown) {
      const lastShown = new Date(user.anniversaryShown);
      const currentYear = new Date().getFullYear();
      const lastShownYear = lastShown.getFullYear();

      if (lastShownYear === currentYear) {
        return false;
      }
    }

    const years = getYearsSinceCreation();
    return years > 0 && years % 1 === 0; // Show on exact year anniversaries
  });

  const getYearsSinceCreation = () => {
    const user = authStore.currentUser;
    if (!user || !user.dateCreated) return 0;

    try {
      const creationDate = new Date(user.dateCreated);
      const currentDate = new Date();

      if (isNaN(creationDate.getTime())) return 0;

      const diffTime = currentDate - creationDate;
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years

      return Math.floor(diffYears);
    } catch (error) {
      return 0;
    }
  };

  return {
    shouldShowAnniversary,
    getYearsSinceCreation,
  };
}
