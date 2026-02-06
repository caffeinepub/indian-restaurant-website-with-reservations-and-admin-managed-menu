export function formatPrice(priceInPaise: bigint): string {
  const rupees = Number(priceInPaise) / 100;
  return `₹${rupees.toFixed(2)}`;
}
