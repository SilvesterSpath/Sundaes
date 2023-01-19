/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @param {number} currency
 * @returns {string} number formatted as currency.
 *
 * @example
 *   formatCurrency(0)
 *   // => $0.00
 *
 * @example
 *   formatCurrency(1.5)
 *   // => $1.50
 *
 */

export function formatCurrency(number) {
  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number);
}
