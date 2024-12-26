"use server"

import { requireUser } from "./utils/hooks"
import { parseWithZod } from '@conform-to/zod'
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas"
import prisma from "./utils/db"
import { redirect } from "next/navigation"
import { emailClient } from "./utils/mailtrap"
import { formatCurrency } from "./utils/formatCurrency"

export async function onboardUser(prevState: any,  formData: FormData) {
    const session  = await requireUser()

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    })

    if(submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        },
    })

    return redirect("/dashboard")
}

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();
  
    const submission = parseWithZod(formData, {
      schema: invoiceSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const data = await prisma.invoice.create({
      data: {
        clientAddress: submission.value.clientAddress,
        clientEmail: submission.value.clientEmail,
        clientName: submission.value.clientName,
        currency: submission.value.currency,
        date: submission.value.date,
        dueDate: submission.value.dueDate,
        fromAddress: submission.value.fromAddress,
        fromEmail: submission.value.fromEmail,
        fromName: submission.value.fromName,
        invoiceItemDescription: submission.value.invoiceItemDescription,
        invoiceItemQuantity: submission.value.invoiceItemQuantity,
        invoiceItemRate: submission.value.invoiceItemRate,
        invoiceName: submission.value.invoiceName,
        invoiceNumber: submission.value.invoiceNumber,
        status: submission.value.status,
        total: submission.value.total,
        note: submission.value.note,
        userId: session.user?.id,
      },
    });
    
    const sender = {
        email: "hello@demomailtrap.com",
        name: "Mailtrap Demo",
      };
    
      emailClient.send({
        from: sender,
        to: [{ email: "dev.vadimghedreutan@gmail.com" }],
        template_uuid: "3ce0304b-f9bb-4832-9417-ede43c10c7fe",
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            invoiceDueDate: new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            invoiceAmount: formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),
            invoiceLink: "Test_InvoiceLink"
                
            },  
      });
    


    return redirect("/dashboard/invoices");
}
