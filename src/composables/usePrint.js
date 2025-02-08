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

  const injectPrintPreviewTableStyles = () => {
    document.body.dataset.bgColor =
      document.body.style.backgroundColor;
    document.body.dataset.textColor = document.body.style.color;

    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";

    const tables = document.querySelectorAll(".print-preview-table");
    tables.forEach((table) => {
      table.style.backgroundColor = "#fff";
      table.style.borderCollapse = "collapse";

      table.querySelectorAll("th, td").forEach((cell) => {
        cell.style.border = "1px solid black";
        cell.style.color = "black";
      });

      table.querySelectorAll("th").forEach((th) => {
        th.style.backgroundColor = "#f2f2f2";
      });
    });
  };

  const removePrintPreviewTableStyles = () => {
    document.body.style.backgroundColor =
      document.body.dataset.bgColor || "";
    document.body.style.color = document.body.dataset.textColor || "";

    document
      .querySelectorAll(".print-preview-table")
      .forEach((table) => {
        table.style.backgroundColor = "";
        table.style.borderCollapse = "";

        table.querySelectorAll("th, td").forEach((cell) => {
          cell.style.border = "";
          cell.style.color = "";
        });

        table.querySelectorAll("th").forEach((th) => {
          th.style.backgroundColor = "";
        });
      });
  };

  const downloadPdf = () => {
    injectPrintPreviewTableStyles();

    html2pdf()
      .set({
        margin: 8,
        filename: `${document.title}.pdf`,
        image: { type: "jpeg", quality: 3 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          dpi: 192,
          letterRendering: true,
        },
        pagebreak: {
          avoid: "tr",
          mode: "css",
          before: "",
          after: "",
        },
        jsPDF: {
          unit: "mm",
          format: format.value,
          orientation: orientation.value,
          compress: true,
          putTotalPages: true,
        },
      })
      .from(printRef.value)
      .save()
      .catch((error) => console.error("PDF generation error:", error))
      .finally(() => {
        removePrintPreviewTableStyles();
      });
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
