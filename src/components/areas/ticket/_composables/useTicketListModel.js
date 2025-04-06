import { ref } from "vue";

const testTickets = [
  {
    id: 1,
    title: "مشکل در ورود به سیستم",
    description: "نمی‌توانم با رمز عبور جدید وارد سیستم شوم",
    priority: "high",
    status: "closed",
    category: "مشکل فنی",
    createdAt: "2024-03-15",
    response:
      "رمز عبور شما ریست شده است. لطفاً از رمز عبور موقت استفاده کنید و آن را تغییر دهید.",
  },
  {
    id: 2,
    title: "درخواست ویژگی جدید",
    description:
      "آیا امکان اضافه کردن قابلیت گزارش‌گیری پیشرفته وجود دارد؟",
    priority: "medium",
    status: "in-progress",
    category: "درخواست ویژگی جدید",
    createdAt: "2024-03-16",
    response:
      "این قابلیت در دست توسعه است و در نسخه بعدی نرم‌افزار اضافه خواهد شد.",
  },
  {
    id: 3,
    title: "خطا در محاسبات مالی",
    description: "در گزارش مالی هفتگی، جمع کل اشتباه محاسبه می‌شود",
    priority: "high",
    status: "open",
    category: "گزارش خطا",
    createdAt: "2024-03-17",
  },
  {
    id: 4,
    title: "درخواست آموزش نرم‌افزار",
    description: "لطفاً یک جلسه آموزش آنلاین برای تیم ما ترتیب دهید",
    priority: "medium",
    status: "in-progress",
    category: "پرسش عمومی",
    createdAt: "2024-03-18",
    response:
      "جلسه آموزش در تاریخ ۲۵ فروردین ساعت ۱۰ صبح برگزار خواهد شد.",
  },
  {
    id: 5,
    title: "مشکل در چاپ فاکتور",
    description: "فاکتورها با فرمت اشتباه چاپ می‌شوند",
    priority: "high",
    status: "closed",
    category: "مشکل فنی",
    createdAt: "2024-03-19",
    response:
      "مشکل برطرف شد. لطفاً از آخرین نسخه درایور چاپگر استفاده کنید.",
  },
  {
    id: 6,
    title: "پیشنهاد بهبود رابط کاربری",
    description:
      "پیشنهاد می‌کنم دکمه‌های اصلی را در نوار بالایی قرار دهید",
    priority: "low",
    status: "open",
    category: "درخواست ویژگی جدید",
    createdAt: "2024-03-20",
  },
  {
    id: 7,
    title: "مشکل در همگام‌سازی داده‌ها",
    description: "داده‌های جدید در دستگاه موبایل نمایش داده نمی‌شوند",
    priority: "high",
    status: "in-progress",
    category: "مشکل فنی",
    createdAt: "2024-03-21",
    response:
      "تیم پشتیبانی در حال بررسی مشکل است. لطفاً موقتاً از نسخه وب استفاده کنید.",
  },
  {
    id: 8,
    title: "درخواست پشتیبانی از زبان انگلیسی",
    description:
      "آیا امکان اضافه کردن زبان انگلیسی به نرم‌افزار وجود دارد؟",
    priority: "medium",
    status: "open",
    category: "درخواست ویژگی جدید",
    createdAt: "2024-03-22",
  },
  {
    id: 9,
    title: "مشکل در بارگذاری تصاویر",
    description: "تصاویر محصولات با تاخیر زیاد بارگذاری می‌شوند",
    priority: "high",
    status: "open",
    category: "مشکل فنی",
    createdAt: "2024-03-23",
  },
  {
    id: 10,
    title: "درخواست قابلیت جستجوی پیشرفته",
    description: "امکان جستجو بر اساس فیلترهای متعدد نیاز داریم",
    priority: "medium",
    status: "in-progress",
    category: "درخواست ویژگی جدید",
    createdAt: "2024-03-24",
    response:
      "این قابلیت در حال توسعه است و تا هفته آینده در دسترس خواهد بود.",
  },
  {
    id: 11,
    title: "سوال در مورد نحوه صدور فاکتور",
    description:
      "لطفاً راهنمایی کنید چگونه فاکتور با تخفیف صادر کنم؟",
    priority: "low",
    status: "closed",
    category: "پرسش عمومی",
    createdAt: "2024-03-25",
    response:
      "برای صدور فاکتور با تخفیف، ابتدا درصد تخفیف را در قسمت مربوطه وارد کنید و سپس فاکتور را ثبت نمایید.",
  },
  {
    id: 12,
    title: "گزارش خطا در محاسبه مالیات",
    description: "مالیات بر ارزش افزوده به اشتباه محاسبه می‌شود",
    priority: "high",
    status: "in-progress",
    category: "گزارش خطا",
    createdAt: "2024-03-26",
    response:
      "تیم فنی در حال بررسی مشکل است. لطفاً تا رفع مشکل از محاسبه دستی استفاده کنید.",
  },
];

const tickets = ref([]);

export function useTicketListModel() {
  const loading = ref(false);

  async function fetchTickets() {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      tickets.value = [...testTickets];
    } catch (error) {
      console.error("Error fetching tickets:", error);
      tickets.value = [];
    } finally {
      loading.value = false;
    }
  }

  fetchTickets();

  return {
    tickets,
    loading,
    fetchTickets,
  };
}
