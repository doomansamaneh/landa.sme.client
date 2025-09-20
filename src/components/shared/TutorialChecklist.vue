<template>
  <q-page-sticky
    v-if="showChecklist"
    position="bottom-right"
    :offset="[18, 18]"
    class="z-1"
    @click="handleOpen"
  >
    <q-btn
      rounded
      unelevated
      padding="8px 16px 8px 24px"
      class="primary-shadow primary-gradient text-white"
    >
      <q-icon name="o_menu" class="q-mr-xs" />
      <span>چک لیست تازه کار</span>
      <q-badge
        v-if="remainingTasks > 0"
        :label="remainingTasks"
        color="negative"
        floating
        class="text-body2 q-mr-xs"
      />

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
                <q-icon name="o_expand_more" size="20px" />
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
              :clickable="isTaskClickable(index)"
              @click="isTaskClickable(index) && goTo(task)"
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
                <div class="text-caption caption-on-dark">
                  {{ task.description }}
                </div>
              </q-item-section>
              <q-item-section
                side
                v-if="task.route && isTaskClickable(index)"
              >
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
              rounded
              flat
              size="sm"
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
          :clickable="isTaskClickable(index)"
          @click="isTaskClickable(index) && goTo(task)"
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
            <div class="text-caption caption-on-dark">
              {{ task.description }}
            </div>
          </q-item-section>
          <q-item-section
            side
            v-if="task.route && isTaskClickable(index)"
          >
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="chevron_left"
              @click.stop="goTo(task)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="right">
        <q-btn
          rounded
          flat
          size="sm"
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
  import { useFirstLogin } from "src/composables/useFirstLogin";
  import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();

  const popup = ref(null);
  const tutorialStore = useFirstLogin();
  const dialog = ref(false);

  // Show checklist based on showTutorial state and firstLogin state
  const showChecklist = computed(
    () =>
      tutorialStore.showTutorial.value &&
      !tutorialStore.firstLogin.value
  );
  const tasks = ref([
    {
      title: "ثبت نام",
      description: "ایجاد حساب کاربری رایگان",
      completed: true,
      route: null,
    },
    {
      title: "راه اندازی کسب و کار",
      description: "تنظیمات اولیه کسب و کار",
      completed: true,
      route: null,
    },
    {
      title: "ایجاد حسابهای بانکی",
      description: "یک یا چند حساب بانکی خود را تعریف کنید",
      completed: false,
      route: "/trs/bankAccount",
    },
    {
      title: "ایجاد کالاها و خدمات",
      description: "کالا و خدمات خود را تعریف کنید",
      completed: false,
      route: "/cmn/product",
    },
    {
      title: "ایجاد مشتریان",
      description: "مشتریان و طرف حسابهای خود را تعریف کنید",
      completed: false,
      route: "/crm/customer",
    },
    {
      title: "ایجاد اولین فاکتور فروش",
      description: "اولین فاکتور فروش خود را ایجاد کنید",
      completed: false,
      route: "/sls/invoice/create",
    },
  ]);

  function goTo(task) {
    if (!task?.route) return;
    router.push(task.route);
  }

  // Function to check if a task is clickable (can be accessed)
  function isTaskClickable(index) {
    const task = tasks.value[index];

    // If task has no route, it's not clickable
    if (!task.route) return false;

    // First task is always clickable
    if (index === 0) return true;

    // For other tasks, check if all previous tasks are completed
    for (let i = 0; i < index; i++) {
      if (!tasks.value[i].completed) {
        return false;
      }
    }

    return true;
  }

  const progress = computed(() => {
    const total = tasks.value.length || 1;
    const completed = tasks.value.filter((t) => t.completed).length;
    return completed / total;
  });

  // Computed property for remaining tasks count
  const remainingTasks = computed(() => {
    return tasks.value.filter((t) => !t.completed).length;
  });

  function showPopup() {
    if (!showChecklist.value) return;
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
      component: ConfirmDialog,
      componentProps: {
        title: "عدم نمایش راهنما",
        message:
          "آیا مطمئن هستید که دیگر این راهنما نمایش داده نشود؟",
        ok: "shared.labels.accept",
        cancel: "shared.labels.cancel",
        okColor: "primary",
      },
    }).onOk(() => {
      tutorialStore.hideTutorial();
      onPopupHide();
    });
  }

  const showDialog = () => {
    dialog.value = true;
  };

  const closeDialog = () => {
    dialog.value = false;
  };

  // Function to update tasks based on current route
  function updateTasksFromRoute() {
    const currentPath = route.fullPath || route.path || "";
    const hasChanges = tutorialStore.markTaskCompletedByRoute(
      currentPath,
      tasks.value
    );

    if (hasChanges) {
      // Ensure sequential completion - only allow completing tasks in order
      ensureSequentialCompletion();

      // Check if all tasks are completed
      if (tutorialStore.areAllTasksCompleted(tasks.value)) {
        // Auto-complete tutorial when all tasks are completed
        tutorialStore.completeTutorial();
      }
    }
  }

  // Function to ensure tasks are completed sequentially
  function ensureSequentialCompletion() {
    for (let i = 0; i < tasks.value.length; i++) {
      const task = tasks.value[i];

      // If this task is not completed, uncomplete all subsequent tasks
      if (!task.completed) {
        for (let j = i + 1; j < tasks.value.length; j++) {
          tasks.value[j].completed = false;
        }
        break;
      }
    }
  }

  onMounted(() => {
    // Check current route on mount
    updateTasksFromRoute();

    if (showChecklist.value) {
      showPopup();
    }
  });

  // Watch for route changes
  watch(
    () => route.fullPath,
    () => {
      updateTasksFromRoute();
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
