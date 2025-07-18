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
        resetAllBorderColors();
      }
    },

    onBeforeGetContent: async () => {
      if (printRef?.value) {
        printRef.value.classList.add("printable");
        printRef.value.style.direction = $q.lang.rtl ? "rtl" : "ltr";
        setAllBordersToBlack();

        // Add print styles for bg-on-dark
        const style = document.createElement("style");
        style.textContent = `
          @media print {
            .bg-on-dark {
              background-color: #f2f2f2 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        `;
        document.head.appendChild(style);
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

  const setAllBordersToBlack = () => {
    if (printRef.value) {
      const allElements = printRef.value.querySelectorAll("*");
      allElements.forEach((element) => {
        if (window.getComputedStyle(element).border !== "none") {
          element.style.borderColor = "black";
        }
      });
    }
  };

  const resetAllBorderColors = () => {
    if (printRef.value) {
      const allElements = printRef.value.querySelectorAll("*");
      allElements.forEach((element) => {
        if (window.getComputedStyle(element).border !== "none") {
          element.style.borderColor = "";
        }
      });
    }
  };

  const injectPrintPreviewTableStyles = () => {
    document.body.dataset.bgColor =
      document.body.style.backgroundColor;
    document.body.dataset.textColor = document.body.style.color;

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

      table.querySelectorAll(".bg-on-dark").forEach((element) => {
        element.style.backgroundColor = "#f2f2f2";
        element.style.color = "black";
      });
    });

    document.querySelectorAll(".bg-on-dark").forEach((element) => {
      element.style.backgroundColor = "#f2f2f2";
      element.style.color = "black";
    });
  };

  const injectBalanceSheetPreviewTableStyles = () => {
    document.body.dataset.bgColor =
      document.body.style.backgroundColor;
    document.body.dataset.textColor = document.body.style.color;

    const tables = document.querySelectorAll(
      ".balance-sheet-preview-table"
    );
    tables.forEach((table) => {
      table.style.backgroundColor = "#fff";
      table.style.borderCollapse = "collapse";

      table.querySelectorAll("th, td").forEach((cell) => {
        cell.style.border = "none";
        cell.style.color = "black";
      });

      table.querySelectorAll("th").forEach((th) => {
        th.style.backgroundColor = "#f2f2f2";
      });
    });
  };

  const injectStripedTableStyles = () => {
    document.body.dataset.bgColor =
      document.body.style.backgroundColor;
    document.body.dataset.textColor = document.body.style.color;

    const tables = document.querySelectorAll(".striped-table");
    tables.forEach((table) => {
      table.style.backgroundColor = "#fff";
      table.style.borderCollapse = "collapse";

      table.querySelectorAll("th, td").forEach((cell) => {
        cell.style.border = "none";
        cell.style.color = "black";
      });

      table.querySelectorAll("th").forEach((th) => {
        th.style.backgroundColor = "#f2f2f2";
      });

      table.querySelectorAll("tr:nth-child(even)").forEach((row) => {
        row.style.backgroundColor = "#f2f2f2";
      });
    });
  };

  const injectInvoicePreviewTableStyles = () => {
    document.body.dataset.bgColor =
      document.body.style.backgroundColor;
    document.body.dataset.textColor = document.body.style.color;

    const tables = document.querySelectorAll(
      ".invoice-preview-table"
    );
    tables.forEach((table) => {
      table.style.backgroundColor = "#fff";
      table.style.borderCollapse = "collapse";

      table.querySelectorAll("th, td").forEach((cell) => {
        cell.style.border = "";
        cell.style.color = "black";
      });

      table.querySelectorAll("th").forEach((th) => {
        th.style.backgroundColor = "";
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

  const removeBalanceSheetPreviewTableStyles = () => {
    document.body.style.backgroundColor = "";
    document.body.style.color = document.body.dataset.textColor || "";

    document
      .querySelectorAll(".balance-sheet-preview-table")
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

  const removeStripedTableStyles = () => {
    document.body.style.backgroundColor = "";

    if (document.body.dataset.textColor) {
      document.body.style.color = document.body.dataset.textColor;
      delete document.body.dataset.textColor;
    }

    const tables = document.querySelectorAll(".striped-table");
    tables.forEach((table) => {
      table.style.removeProperty("background-color");
      table.style.removeProperty("border-collapse");

      table.querySelectorAll("th, td").forEach((cell) => {
        cell.style.removeProperty("border");
        cell.style.removeProperty("color");
      });

      table.querySelectorAll("th").forEach((th) => {
        th.style.removeProperty("background-color");
      });

      table.querySelectorAll("tr").forEach((row) => {
        row.style.removeProperty("background-color");
      });
    });
  };

  const removeInvoicePreviewTableStyles = () => {
    document.body.style.backgroundColor =
      document.body.dataset.bgColor || "";
    document.body.style.color = document.body.dataset.textColor || "";

    document
      .querySelectorAll(".invoice-preview-table")
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
    document.body.style.color = "#000";

    injectPrintPreviewTableStyles();
    injectBalanceSheetPreviewTableStyles();
    injectStripedTableStyles();
    injectInvoicePreviewTableStyles();

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
        removeBalanceSheetPreviewTableStyles();
        removeStripedTableStyles();
        removeInvoicePreviewTableStyles();
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
