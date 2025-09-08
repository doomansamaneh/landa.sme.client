<template>
  <q-page-sticky
    v-if="!isDismissed"
    position="bottom-right"
    :offset="[18, 18]"
    class="z-1"
    @click="handleOpen"
  >
    <q-btn
      rounded
      unelevated
      padding="8px 16px"
      class="primary-shadow primary-gradient text-white"
    >
      <q-icon name="o_menu" class="q-mr-xs" />
      <span>چک لیست تازه کار</span>

      <q-menu
        v-if="$q.screen.gt.sm"
        ref="popup"
        no-parent-event
        no-focus
        no-refocus
        persistent
        cover
        fit
        @show="onPopupShow"
        @hide="onPopupHide"
        class="q-ma-md border-radius-lg"
      >
        <q-card flat class="checklist-card">
          <q-card-section class="text-subtitle2">
            <div
              class="flex items-center justify-between q-gutter-md"
            >
              <div>این آموزش‌ها به شما کمک می‌کنند شروع کنید</div>

              <q-btn
                size="sm"
                round
                dense
                unelevated
                @click="onPopupHide"
              >
                <q-icon name="o_close" />
              </q-btn>
            </div>
          </q-card-section>

          <q-linear-progress
            :value="progress"
            color="primary"
            track-color="grey-3"
            class="q-mb-md rounded-borders"
            height="16px"
          >
            <template v-slot:default>
              <div class="text-caption text-white q-pa-xs">
                {{ Math.round(progress * 100) }}%
              </div>
            </template>
          </q-linear-progress>

          <q-list>
            <q-item
              v-for="(task, index) in tasks"
              :key="index"
              :clickable="!!task.route"
              @click="task.route && goTo(task)"
              :class="{ 'bg-on-dark': task.completed }"
            >
              <q-item-section avatar>
                <q-icon
                  :name="
                    task.completed
                      ? 'check_circle'
                      : 'radio_button_unchecked'
                  "
                  :color="task.completed ? 'green' : 'grey-5'"
                />
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2 text-weight-bold">
                  {{ task.title }}
                </div>
                <div class="text-caption text-grey-6">
                  {{ task.description }}
                </div>
              </q-item-section>
              <q-item-section side v-if="task.route">
                <q-btn
                  flat
                  round
                  dense
                  color="primary"
                  icon="chevron_left"
                  @click.stop="goTo(task)"
                  :aria-label="`رفتن به ${task.title}`"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions align="right">
            <q-btn
              flat
              size="sm"
              color="grey-6"
              label="دیگر نمایش نده"
              @click="onDismissClick"
            />
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-btn>
  </q-page-sticky>

  <q-dialog v-model="dialog" position="bottom">
    <q-card flat class="checklist-card">
      <q-card-section class="text-subtitle2">
        <div class="flex items-center justify-between">
          <div>این آموزش‌ها به شما کمک می‌کنند شروع کنید</div>

          <q-btn
            size="sm"
            round
            dense
            unelevated
            @click="closeDialog"
          >
            <q-icon name="o_close" />
          </q-btn>
        </div>
      </q-card-section>

      <q-linear-progress
        :value="progress"
        color="primary"
        track-color="grey-3"
        class="q-mb-md rounded-borders"
        height="16px"
      >
        <template v-slot:default>
          <div class="text-caption text-white q-pa-xs">
            {{ Math.round(progress * 100) }}%
          </div>
        </template>
      </q-linear-progress>

      <q-list>
        <q-item
          v-for="(task, index) in tasks"
          :key="index"
          :clickable="!!task.route"
          @click="task.route && goTo(task)"
          :class="{ 'bg-on-dark': task.completed }"
        >
          <q-item-section avatar>
            <q-icon
              :name="
                task.completed
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              :color="task.completed ? 'green' : 'grey-5'"
            />
          </q-item-section>
          <q-item-section>
            <div class="text-subtitle2 text-weight-bold">
              {{ task.title }}
            </div>
            <div class="text-caption text-grey-6">
              {{ task.description }}
            </div>
          </q-item-section>
          <q-item-section side v-if="task.route">
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="chevron_left"
              @click.stop="goTo(task)"
              :aria-label="`رفتن به ${task.title}`"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="right">
        <q-btn
          flat
          size="sm"
          color="grey-6"
          label="دیگر نمایش نده"
          @click="onDismissClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useQuasar } from "quasar";
  import { useRouter, useRoute } from "vue-router";
  import { useTutorialChecklist } from "src/composables/useTutorialChecklist";

  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();

  const COMPLETED_KEY = "tutorial_checklist_completed";

  const popup = ref(null);
  const isDismissed = ref(false);
  const FINISHED_KEY = "tutorial_checklist_finished";
  const tutorialStore = useTutorialChecklist();
  const dialog = ref(false);

  const tasks = ref([
    {
      title: "ثبت‌نام",
      description: "ایجاد حساب کاربری رایگان",
      completed: true,
      route: null,
    },
    {
      title: "تنظیم حساب کاربری",
      description: "افزودن اطلاعات شرکت",
      completed: false,
      route: "/cmn/appConfig/basicInfo",
    },
    {
      title: "ایجاد پیش‌فاکتور",
      description: "راهنمای مرحله‌به‌مرحله ایجاد پیش‌فاکتور",
      completed: false,
      route: "/sls/quote/create",
    },
    {
      title: "ایجاد فاکتور",
      description: "آشنایی با مراحل صدور فاکتور",
      completed: false,
      route: "/sls/invoice/create",
    },
  ]);

  function goTo(task) {
    if (!task?.route) return;
    router.push(task.route);
  }

  const progress = computed(() => {
    const completedCount = tasks.value.filter(
      (task) => task.completed
    ).length;
    return completedCount / tasks.value.length;
  });

  function checkAllDoneAndFinish() {
    const allDone = tasks.value.every((t) => t.completed);
    if (allDone) {
      try {
        localStorage.setItem(FINISHED_KEY, "1");
      } catch {}
      isDismissed.value = true;
      onPopupHide();
      // Open congrats dialog and signal layout to hide checklist
      tutorialStore.markAllDone();
      window.dispatchEvent(
        new CustomEvent("tutorial-checklist-finished")
      );
    }
  }

  function showPopup() {
    if (isDismissed.value) return;
    popup?.value?.show();
  }

  function onPopupShow() {
    popup?.value?.show();
  }

  function onPopupHide() {
    popup?.value?.hide();
  }

  function onDismissClick() {
    $q.dialog({
      title: "عدم نمایش راهنما",
      message: "آیا مطمئن هستید که دیگر این راهنما نمایش داده نشود؟",
      cancel: {
        label: "انصراف",
        color: "grey-7",
        flat: true,
      },
      ok: {
        label: "تایید",
        color: "primary",
      },
      persistent: true,
    })
      .onOk(() => {
        localStorage.setItem("tutorial_checklist_dismissed", "1");
        isDismissed.value = true;
        onPopupHide();
      })
      .onCancel(() => {
        // do nothing on cancel
      });
  }

  function loadCompletedRoutes() {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(list) ? list : []);
    } catch {
      return new Set();
    }
  }

  function saveCompletedRoutes(completedSet) {
    try {
      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(Array.from(completedSet))
      );
    } catch {
      // ignore
    }
  }

  const completedRoutes = ref(loadCompletedRoutes());

  function applyCompletedToTasks() {
    tasks.value.forEach((task) => {
      if (!task.route) return;
      if (completedRoutes.value.has(task.route)) {
        task.completed = true;
      }
    });
  }

  function updateCompletionFromRoute() {
    const currentPath = route.fullPath || route.path || "";
    let changed = false;
    tasks.value.forEach((task) => {
      if (!task.route) return;
      const matches =
        currentPath === task.route ||
        currentPath.startsWith(task.route + "/");
      if (matches && !completedRoutes.value.has(task.route)) {
        completedRoutes.value.add(task.route);
        task.completed = true; // mark and keep it
        changed = true;
      } else if (completedRoutes.value.has(task.route)) {
        task.completed = true; // keep previously completed tasks checked
      }
    });
    if (changed) saveCompletedRoutes(completedRoutes.value);
    checkAllDoneAndFinish();
  }

  const showDialog = () => {
    dialog.value = true;
  };

  const closeDialog = () => {
    dialog.value = false;
  };

  onMounted(() => {
    const dismissed =
      localStorage.getItem("tutorial_checklist_dismissed") === "1";
    const finished = localStorage.getItem(FINISHED_KEY) === "1";
    isDismissed.value = dismissed || finished;
    if (!isDismissed.value) {
      showPopup();
    }
    applyCompletedToTasks();
    updateCompletionFromRoute();
  });

  watch(
    () => route.fullPath,
    () => {
      updateCompletionFromRoute();
    }
  );

  const handleOpen = () => {
    if ($q.screen.gt.sm) {
      showPopup();
    } else {
      showDialog();
    }
  };
</script>

<style scoped lang="scss">
  // .checklist-card {
  //   min-width: 380px;
  // }
</style>
