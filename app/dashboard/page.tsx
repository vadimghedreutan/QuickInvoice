import { DashboardBlocks } from "../components/DashboardBlocks"
import { InvoiceGraph } from "../components/InvoiceGraph"
import { RecentInvoices } from "../components/RecentInvoices"
import { requireUser } from "../utils/hooks"

export default async function DashboardRoute() {
	const session = await requireUser()
	return (
		<div className="flex flex-col space-y-8">
			<DashboardBlocks />
			<div className="grid gap-4 2xl:grid-cols-2">
				<InvoiceGraph />
				<RecentInvoices />
			</div>
		</div>
	)
}
