import { ref, defineExpose } from "vue";
import { useVueToPrint } from "vue-to-print";
import { useQuasar } from "quasar"; // Import Quasar for RTL checks

const printRef = ref(null);

export function usePrint() {
  const $q = useQuasar();

  const options = {
    content: () => printRef.value,
    bodyClass: "",
    copyStyles: true,
    pageStyle: ``,
    onAfterPrint: () => {
      if (printRef.value) {
        printRef.value.classList.remove("printable");
        printRef.value.style.direction = ""; // Reset the direction
      }
    },
    onBeforeGetContent: async () => {
      if (printRef.value) {
        printRef.value.classList.add("printable");
        // Set direction based on RTL or LTR
        printRef.value.style.direction = $q.lang.rtl ? "rtl" : "ltr";
      }
    },
    onBeforePrint: () => {
      console.log("Before printing...");
    },
    onPrintError: (location, error) => {
      console.error(`Error in ${location}:`, error);
    },
    removeAfterPrint: true,
    suppressErrors: false,
  };

  const { handlePrint } = useVueToPrint(options);

  defineExpose({
    handlePrint,
  });

  return {
    printRef,
    handlePrint,
  };
}
