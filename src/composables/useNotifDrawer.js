import { ref, computed } from "vue";

const state = ref(false);
const notif = ref(13);

const notifications = ref([
  {
    id: 1,
    title: "یک پیام از طرف ریچارد شیردل",
    date: "امروز",
    subject: "دریافت و پرداخت",
    read: false,
  },
  {
    id: 2,
    title: "موعد پرداخت چک",
    date: "1403/03/31",
    subject: "چک",
    read: false,
  },
  {
    id: 3,
    title: "بروزرسانی موجودی حساب",
    date: "دیروز",
    subject: "بانک",
    read: true,
  },
  {
    id: 4,
    title: "تغییر رمز عبور",
    date: "1403/03/28",
    subject: "امنیت",
    read: true,
  },
  {
    id: 5,
    title: "فعالیت مشکوک",
    date: "1403/03/27",
    subject: "امنیت",
    read: true,
  },
  {
    id: 6,
    title: "پرداخت قبض",
    date: "1403/03/26",
    subject: "قبض",
    read: true,
  },
  {
    id: 7,
    title:
      "پیام جدید از طرف پشتیابی دومان سامانه برای تست و کارهای دمو",
    date: "1403/03/25",
    subject: "پشتیبانی",
    read: true,
  },
  {
    id: 8,
    title: "بروزرسانی شرایط و ضوابط",
    date: "1403/03/24",
    subject: "حقوقی",
    read: true,
  },
  {
    id: 9,
    title: "درخواست برداشت وجه",
    date: "1403/03/23",
    subject: "برداشت",
    read: true,
  },
  {
    id: 10,
    title: "تایید هویت دو مرحله‌ای",
    date: "1403/03/22",
    subject: "امنیت",
    read: true,
  },
  {
    id: 11,
    title: "تراکنش موفق",
    date: "1403/03/21",
    subject: "تراکنش",
    read: true,
  },
  {
    id: 12,
    title: "لغو تراکنش",
    date: "1403/03/20",
    subject: "تراکنش",
    read: true,
  },
  {
    id: 13,
    title: "پرداخت اجاره",
    date: "1403/03/19",
    subject: "پرداخت",
    read: true,
  },
  {
    id: 14,
    title: "خرید موفق",
    date: "1403/03/18",
    subject: "خرید",
    read: true,
  },
  {
    id: 15,
    title: "یادآوری پرداخت وام",
    date: "1403/03/17",
    subject: "وام",
    read: true,
  },
  {
    id: 16,
    title: "رسید پرداخت",
    date: "1403/03/16",
    subject: "رسید",
    read: true,
  },
  {
    id: 17,
    title: "پیام جدید از بانک",
    date: "1403/03/15",
    subject: "بانک",
    read: true,
  },
  {
    id: 18,
    title: "اطلاعیه مهم",
    date: "1403/03/14",
    subject: "اطلاعیه",
    read: true,
  },
  {
    id: 19,
    title: "بروزرسانی نرم‌افزار",
    date: "1403/03/13",
    subject: "نرم‌افزار",
    read: true,
  },
  {
    id: 20,
    title: "درخواست اطلاعات بیشتر",
    date: "1403/03/12",
    subject: "درخواست",
    read: true,
  },
]);

const toggle = () => {
  state.value = !state.value;
};

const readCount = computed(
  () => notifications.value.filter((n) => n.read).length
);
const totalCount = computed(() => notifications.value.length);

const allChecked = ref(false);

const toggleAll = (value) => {
  notifications.value.forEach((notification) => {
    notification.read = value;
  });
  updateReadCount();
};

const updateReadCount = () => {
  allChecked.value = notifications.value.every(
    (notification) => notification.read
  );
};

const markAsRead = (notification) => {
  notification.read = true;
  updateReadCount();
};

const toggleMarkAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = !notification.read;
  });
  updateReadCount();
};

const hasUnreadNotifications = computed(() =>
  notifications.value.some((notification) => !notification.read)
);

export function useNotifDrawer() {
  return {
    state,
    toggle,
    notif,
    notifications,
    readCount,
    totalCount,
    allChecked,
    toggleAll,
    markAsRead,
    hasUnreadNotifications,
    updateReadCount,
    toggleMarkAllAsRead,
  };
}
