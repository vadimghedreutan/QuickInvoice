"use client"

import { cn } from "@/lib/utils"
import { HomeIcon, User2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const dashboardLinks = [
	{
		id: 0,
		name: "Dashboard",
		href: "/dashboard",
		icon: HomeIcon,
	},
	{
		id: 1,
		name: "Invoices",
		href: "/dashboard/invoices",
		icon: User2,
	},
]

export function DashboardLinks() {
	const pathname = usePathname()
	return (
		<>
			{dashboardLinks.map((link) => (
				<Link
					key={link.id}
					href={link.href}
					className={cn(
						pathname === link.href
							? "bg-primary/10 text-primary"
							: "text-muted-foreground hover:text-foreground",
						"flex item-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
					)}
				>
					<link.icon className="size-4" />
					{link.name}
				</Link>
			))}
		</>
	)
}
