interface iAppProps {
    amount : number
    currency: "USA" | "EUR"
}

export function formatCurrency({amount, currency}: iAppProps) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount)
}