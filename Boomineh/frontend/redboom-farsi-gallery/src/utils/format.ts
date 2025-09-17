/**
 *
 * @param value 
 * @param options 
 */
export const formatNumber = (
  value: number,
  options?: { type?: "currency" | "number"; fractionDigits?: number }
) => {
  const { type = "number", fractionDigits } = options || {};

  // اگر پول باشه → از Intl برای جداکننده استفاده می‌کنیم
  if (type === "currency") {
    const formatter = new Intl.NumberFormat("fa-IR", {
      maximumFractionDigits: fractionDigits ?? 0,
    });
    return `${formatter.format(value)} تومان`;
  }

  // اگر فقط "عدد ساده" باشه → فقط تبدیل رقم‌ها به فارسی بدون کاما
  const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return value
    .toString()
    .replace(/[0-9]/g, (d) => persianDigits[+d]);
};
