"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

interface iAppProps {
	text: string
}

export function SubmitButtons({ text }: iAppProps) {
	const { pending } = useFormStatus()
	return (
		<>
			{pending ? (
				<Button className="w-full" disabled>
					<Loader2 className="size-4 mr-2 animate-spin" /> Please
					wait...
				</Button>
			) : (
				<Button type="submit" className="w-full">
					{text}
				</Button>
			)}
		</>
	)
}
