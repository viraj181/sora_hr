import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export interface ExportHeader {
  label: string;
  key: string;
}

export interface ExportOptions {
  exportType: "EXCEL" | "CSV";
  fileName: string;
  headers: ExportHeader[];
  dataRows: Record<string, unknown>[];
}

export const commonExport = async ({
  exportType,
  fileName,
  headers,
  dataRows,
}: ExportOptions) => {
  if (!dataRows?.length) return;

  const rows = dataRows.map((row) =>
    headers.map(({ key }) => {
      const value = row[key];

      if (Array.isArray(value) || typeof value === "object") {
        return JSON.stringify(value ?? "");
      }

      return value ?? "";
    }),
  );

  switch (exportType) {
    case "EXCEL": {
      const workbook = new Workbook();
      const sheet = workbook.addWorksheet("Sheet1");

      const headerRow = sheet.addRow(headers.map((h) => h.label));

      headerRow.eachCell((cell) => {
        cell.font = {
          bold: true,
          color: { argb: "FFFFFFFF" },
        };
      });

      rows.forEach((row) => sheet.addRow(row));

      const buffer = await workbook.xlsx.writeBuffer();

      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${fileName}.xlsx`,
      );

      break;
    }

    case "CSV": {
      const csvContent = [
        headers.map((h) => h.label).join(","),
        ...rows.map((row) =>
          row
            .map((cell) => {
              const value = String(cell ?? "");

              return value.includes(",") ||
                value.includes('"') ||
                value.includes("\n")
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            })
            .join(","),
        ),
      ].join("\n");

      saveAs(
        new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        }),
        `${fileName}.csv`,
      );

      break;
    }
  }
};

// import { Workbook } from "exceljs";
// import { saveAs } from "file-saver";
// // import { generateCommonPDF } from "./generateCommonPDF";

// export interface ExportOptions {
//   exportType: "PDF" | "EXCEL" | "CSV";
//   fileName: string;
//   headers: string[];
//   dataRows: Record<string, string | number | boolean | null | undefined>[];
// }

// export const commonExport = async ({
//   exportType,
//   fileName,
//   headers,
//   dataRows,
// }: ExportOptions) => {
//   if (!dataRows?.length) return;

//   const rows = dataRows;

//   switch (exportType) {
//     // case "PDF":
//     //   generateCommonPDF({
//     //     fileName: `${fileName}.pdf`,
//     //     headerInfo: {
//     //       company: pdfInfo?.company || "",
//     //       generatedBy: pdfInfo?.generatedBy || "",
//     //       module: pdfInfo?.module || "",
//     //     },
//     //     table: {
//     //       headers,
//     //       data,
//     //       columnWidths:
//     //         pdfInfo?.columnWidths ||
//     //         new Array(headers.length).fill(`${100 / headers.length}%`),
//     //       mapRow,
//     //     },
//     //   });
//     //   break;

//     case "EXCEL": {
//       const workbook = new Workbook();
//       const sheet = workbook.addWorksheet("Sheet1");

//       const headerRow = sheet.addRow(headers);

//       headerRow.eachCell((cell) => {
//         cell.font = {
//           bold: true,
//           color: { argb: "FFB71EFF" },
//         };
//       });

//       rows.forEach((row) => sheet.addRow(row));

//       const buffer = await workbook.xlsx.writeBuffer();

//       saveAs(
//         new Blob([buffer], {
//           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         }),
//         `${fileName}.xlsx`,
//       );

//       break;
//     }

//     // case "CSV": {
//     //   const csvContent = [
//     //     headers.join(","),
//     //     ...rows.map((r) => r.join(",")),
//     //   ].join("\n");

//     //   const blob = new Blob([csvContent], {
//     //     type: "text/csv;charset=utf-8;",
//     //   });

//     //   saveAs(blob, `${fileName}.csv`);
//     //   break;
//     // }

//     default:
//       break;
//   }
// };
