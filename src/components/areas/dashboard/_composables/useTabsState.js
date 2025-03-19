import { ref } from "vue";

const tab = ref("general");
const isShaking = ref(false);

export function useTabsState() {
  return { tab, isShaking };
}
