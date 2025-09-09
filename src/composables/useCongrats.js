import { ref } from "vue";

const firstUsage = ref(false);
const confetti = ref(false);
const congratsDialog = ref(false);
const formRef = ref(null);

const selectedOption = ref(null);
const otherText = ref("");

const options = ref([
  {
    label: "دوستان، همکاران و آشنایان",
    value: "friends_family",
    icon: "o_groups",
  },
  {
    label: "جستجو در گوگل",
    value: "search_engine",
    icon: "o_search",
  },
  {
    label: "شبکه‌های اجتماعی",
    value: "social_media",
    icon: "o_whatshot",
  },
  { label: "موارد دیگر", value: "other", icon: "o_more_horiz" },
]);

export function useCongrats() {
  function selectOption(value) {
    selectedOption.value = value;
    if (value !== "other") {
      otherText.value = "";
    }
  }

  function submitForm() {
    if (!selectedOption.value) return;

    if (selectedOption.value === "other" && !otherText.value.trim()) {
      formRef.value.validate();
      return;
    }

    congratsDialog.value = false;
    confetti.value = false;
  }

  return {
    firstUsage,
    confetti,
    congratsDialog,
    formRef,
    selectedOption,
    otherText,
    options,

    selectOption,
    submitForm,
  };
}
