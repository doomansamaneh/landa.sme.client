import { ref, defineExpose } from "vue";
import { useVueToPrint } from "vue-to-print";
import { useQuasar } from "quasar";
import html2pdf from "html2pdf.js";

const printRef = ref(null);

const format = ref("a4");
const orientation = ref("p");

export function usePrint() {
  const $q = useQuasar();

  const options = {
    content: () => printRef.value,
    bodyClass: "",
    copyStyles: true,
    pageStyle: "",
    onAfterPrint: () => {
      if (printRef.value) {
        printRef.value.classList.remove("printable");
        printRef.value.style.direction = "";
      }
    },
    onBeforeGetContent: async () => {
      if (printRef.value) {
        printRef.value.classList.add("printable");
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

  const downloadPdf = () => {
    const printElement = printRef.value;

    html2pdf()
      .set({
        margin: 8,
        filename: `${document.title}.pdf`,
        image: { type: "jpeg", quality: 3 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: format.value,
          orientation: orientation.value,
          compress: true,
        },
      })
      .from(printElement)
      .save()
      .catch((error) =>
        console.error("PDF generation error:", error)
      );
  };

  defineExpose({
    handlePrint,
    downloadPdf,
  });

  return {
    printRef,
    handlePrint,
    downloadPdf,
    format,
    orientation,
  };
}
