import PdfPrinter from "pdfmake";

export const getPDFReadableStream = (data) => {
  // setting the way how to read: font
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: ["a simple string :)", "another simple string :))"],
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();
  return pdfReadableStream;
};
