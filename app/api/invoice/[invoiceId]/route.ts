import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // set font
  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 20, 20);

  // From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(data.date)}`,
    120,
    45
  );
  pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50); 

// Item table header
pdf.setFontSize(10);
pdf.setFont("helvetica", "bold");
pdf.text("Description", 20, 100);
pdf.text("Quantity", 100, 113); // Adjusted y-coordinate for alignment
pdf.text("Rate", 130, 113);    // Adjusted y-coordinate for alignment
pdf.text("Total", 160, 113);   // Adjusted y-coordinate for alignment

// Draw header line
pdf.line(20, 115, 190, 115); // Adjust line to align with headers

// Limit the description to 150 characters
const maxCharacters = 100;
let description: string = data.invoiceItemDescription; // Replace with your actual data source
description = description.substring(0, maxCharacters - 3) + "...";

// Wrap the text into lines of 50 characters each
const maxLineLength = 100; // Limit to 50 characters per line
const wrapText = (text: string, maxLineLength: number): string[] => {
  const lines: string[] = [];
  while (text.length > 0) {
    let line = text.slice(0, maxLineLength);
    text = text.slice(maxLineLength);
    lines.push(line);
  }
  return lines;
};

const wrappedText: string[] = wrapText(description, maxLineLength);

// Variables for positioning
const startX = 20;
let startY = 105;
pdf.setFontSize(10); // Set font size
const lineSpacing = 10 * 0.5; // Line spacing proportional to font size

// Print each line in the PDF
wrappedText.forEach((line: string) => {
  pdf.text(line, startX, startY);
  startY += lineSpacing; // Move to the next line
});

// Print the rest of the item details
pdf.text(data.invoiceItemQuantity.toString(), 100, 120); // Adjusted for alignment
pdf.text(
  formatCurrency({
    amount: data.invoiceItemRate,
    currency: data.currency as any,
  }),
  130,
  120
); // Adjusted for alignment
pdf.text(
  formatCurrency({ amount: data.total, currency: data.currency as any }),
  160,
  120
); // Adjusted for alignment

  // Total Section
  pdf.line(20, 122, 190, 122);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${data.currency})`, 130, 130);
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    130
  );

  //Additional Note
  // Additional Note
if (data.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
  
    // Add the "Note:" label
    pdf.text("Note:", 20, 150);
  
    // Wrap the note text into lines of 50 characters
    const maxLineLength = 150;
    const wrappedNote = wrapText(data.note, maxLineLength);
    const lineSpacing = 10 * 0.5;
  
    // Print each line of the wrapped note
    let startY = 155; // Starting Y position for the note text
    wrappedNote.forEach((line) => {
      pdf.text(line, 20, startY);
      startY += lineSpacing; // Increment Y position for the next line
    });
  }

  // generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  //return pdf as download

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}