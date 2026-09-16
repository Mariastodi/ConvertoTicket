export const FEE_PER_TICKET = 0.5

export function calculateFee(quantity: number): number {
  if (quantity <= 0) return 0
  return quantity * FEE_PER_TICKET
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
