import { Suspense } from "react"
import { DashboardBlocks } from "../components/DashboardBlocks"
import { InvoiceGraph } from "../components/InvoiceGraph"
import { RecentInvoices } from "../components/RecentInvoices"
import { requireUser } from "../utils/hooks"
import { EmptyState } from "../components/EmptyState"
import prisma from "../utils/db"
import { Skeleton } from "@/components/ui/skeleton"

async function getData(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
		},
	})

	return data
}

export default async function DashboardRoute() {
	const session = await requireUser()
	const data = await getData(session.user?.id as string)

	return (
		<>
			{data.length < 1 ? (
				<EmptyState
					title="No invoices found"
					description="Create an invoice to see it right here"
					buttontext="Create Invoice"
					href="/dashboard/invoices/create"
				/>
			) : (
				<Suspense
					fallback={<Skeleton className="w-full h-full flex-1" />}
				>
					<div className="flex flex-col space-y-8">
						<DashboardBlocks />
						<div className="grid gap-4 2xl:grid-cols-2">
							<InvoiceGraph />
							<RecentInvoices />
						</div>
					</div>
				</Suspense>
			)}
		</>
	)
}
