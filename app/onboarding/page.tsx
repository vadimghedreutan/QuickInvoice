"use client"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "../components/SubmitButton"
import { useActionState } from "react"
import { onboardUser } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "../utils/zodSchemas"

export default function OnboardingPage() {
	const [lastResult, action] = useActionState(onboardUser, undefined)
	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: onboardingSchema,
			})
		},

		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})
	return (
		<div className="flex items-center justify-center min-h-screen w-screen">
			<Card className="max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">
						You are almost finished!
					</CardTitle>
					<CardDescription>
						Enter Your information to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className="grid gap-4"
						action={action}
						id={form.id}
						onSubmit={form.onSubmit}
						noValidate
					>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex flex-col gap-2">
								<Label>First Name</Label>
								<Input
									name={fields.firstName.name}
									key={fields.firstName.key}
									defaultValue={fields.firstName.initialValue}
									placeholder="First Name"
								/>
								<p className="text-red-500 text-sm">
									{fields.firstName.errors}
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Last Name</Label>
								<Input
									name={fields.lastName.name}
									key={fields.lastName.key}
									defaultValue={fields.lastName.initialValue}
									placeholder="Last Name"
								/>
								<p className="text-red-500 text-sm">
									{fields.lastName.errors}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Address</Label>
							<Input
								name={fields.address.name}
								key={fields.address.key}
								defaultValue={fields.address.initialValue}
								placeholder="Address"
							/>
							<p className="text-red-500 text-sm">
								{fields.address.errors}
							</p>
						</div>

						<SubmitButton text="Finish onboarding" />
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
