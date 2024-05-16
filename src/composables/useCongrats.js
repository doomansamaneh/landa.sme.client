import { ref } from "vue";

const confetti = ref(true);

export function useCongrats() {

  return {
    confetti,
  };
}
