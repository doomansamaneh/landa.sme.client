<template>
  <div flat>
    <q-card-section class="no-padding">
      <div class="text-body1 q-mb-md">
        <q-icon name="o_comment" size="sm" class="icon q-pr-sm" />
        {{ $t("shared.labels.note") }}
      </div>

      <q-form ref="addNoteForm">
        <div class="row">
          <div class="col-12">
            <q-editor
              class="border-radius-sm"
              v-model="noteModel.comment"
              placeholder="در اینجا می‌توانید یادداشت بگذارید..."
            />
            <q-btn
              no-caps
              @click="addComment"
              flat
              rounded
              class="primary-gradient text-white q-mt-md"
            >
              <q-icon name="o_comment" size="xs" class="q-mr-sm" />
              <span>ذخیره</span>
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-section class="no-padding q-mt-md">
      <div
        class="row items-center justify-between q-pb-sm text-body1"
      >
        <div>
          <q-icon name="o_history" size="sm" class="icon q-pr-sm" />
          تاریخچه
        </div>
        <q-btn
          no-caps
          round
          unelevated
          dense
          icon="o_refresh"
          class="text-on-dark"
          @click="callBack"
        >
          <q-tooltip class="custom-tooltip">
            {{ $t("shared.labels.refresh") }}
          </q-tooltip>
        </q-btn>
      </div>

      <custom-timeline>
        <custom-timeline-entry
          v-for="item in items"
          :key="item.id"
          :color="$q.dark.isActive ? 'yellow' : 'primary'"
        >
          <template #avatar>
            <customer-avatar
              size="31px"
              text-color="white"
              :item="parseUser(item)?.id"
              :text-holder="parseUser(item)?.name"
              text-holder-class="text-h5 text-bold"
              :avatar="avatar"
            />
          </template>

          <q-card bordered class="border-radius-sm">
            <q-card-section>
              <div
                class="row justify-between items-center q-gutter-sm"
              >
                <div class="row items-center">
                  <q-icon
                    :name="getIconName(item)"
                    size="16px"
                    color="accent"
                    class="q-mr-sm"
                  />
                  <span class="text-caption text-bold">
                    {{ parseUser(item).name }}
                  </span>
                  <span class="q-px-sm text-caption">
                    {{ getTime(item) }}
                    <q-tooltip class="glass_ custom-tooltip">
                      {{ item.logTime }}
                    </q-tooltip>
                  </span>
                </div>
                <div class="flex q-gutter-sm text-caption">
                  <div>{{ parseUser(item).ip }}</div>
                  <div>{{ parseUser(item).userAgent }}</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section v-if="item.comment">
              <div
                v-show="editItemId !== item.id"
                class="line-height-sm"
                v-html="item.comment"
              />
              <div
                v-show="editItemId === item.id"
                class="q-gutter-y-md"
              >
                <q-editor v-model="item.comment" />
                <div class="q-gutter-x-sm">
                  <q-btn
                    no-caps
                    @click="editComment(item)"
                    flat
                    rounded
                    class="primary-gradient text-white"
                  >
                    <q-icon
                      name="o_comment"
                      size="xs"
                      class="q-mr-sm"
                    />
                    <span>ذخیره</span>
                  </q-btn>
                  <q-btn
                    no-caps
                    @click="disableEdit()"
                    unelevated
                    rounded
                    class="text-on-dark"
                  >
                    <q-icon
                      name="o_close"
                      size="xs"
                      class="q-mr-xs"
                    />
                    <span>انصراف</span>
                  </q-btn>
                </div>
              </div>

              <div
                v-if="editItemId !== item.id"
                class="row justify-end"
              >
                <q-btn
                  no-caps
                  @click="enableEdit(item)"
                  unelevated
                  rounded
                  class="text-on-dark"
                >
                  <q-icon name="o_edit" size="xs" class="q-mr-sm" />
                  <span>ویرایش</span>
                </q-btn>
                <q-btn
                  no-caps
                  @click="deleteComment(item)"
                  unelevated
                  rounded
                  class="text-on-dark"
                >
                  <q-icon name="o_delete" size="xs" class="q-mr-sm" />
                  <span>حذف</span>
                </q-btn>
              </div>
            </q-card-section>

            <q-card-section v-if="parseInfo(item)?.receiverEmail">
              <span class="q-pr-xs">
                ارسال ایمیل به: {{ parseInfo(item).receiverEmail }} -
              </span>
              <span>{{ parseInfo(item).subject }}</span>
            </q-card-section>
          </q-card>
        </custom-timeline-entry>
      </custom-timeline>
    </q-card-section>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";
  import { logType } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { helper } from "src/helpers";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import CustomTimeline from "src/components/shared/CustomTimeline.vue";
  import CustomTimelineEntry from "src/components/shared/CustomTimelineEntry.vue";

  const props = defineProps({
    items: Array,
    entityId: String,
    entityName: String,
    callBack: Function,
  });

  const $q = useQuasar();
  const addNoteForm = ref(null);
  const editItemId = ref(null);

  const noteModel = ref({
    entityId: props.entityId,
    entityName: props.entityName,
    comment: null,
  });

  const formStore = useFormActions("cmn/entityNote");

  const addComment = async () => {
    await formStore.customPostAction("create", noteModel.value);
    props.callBack?.();
  };

  const editComment = async (item) => {
    await formStore.customPostAction("edit", {
      id: item.id,
      comment: item.comment,
    });
    disableEdit();
  };

  const deleteComment = async (item) => {
    await formStore.deleteById(item.id, () => props.callBack?.());
  };

  const enableEdit = (item) => {
    editItemId.value = item.id;
  };

  const disableEdit = () => {
    editItemId.value = null;
  };

  const getIconName = (item) => {
    switch (item.logType) {
      case logType.create:
        return "add";
      case logType.edit:
        return "edit";
      case logType.delete:
        return "delete";
      case logType.comment:
        return "comment";
      default:
        return "info";
    }
  };

  const getTime = (item) => {
    const past = helper.parseDateString(item.logTime);
    const now = helper.parseDateString(new Date().toDateTimeString());
    const secondsAgo =
      helper.dateToNumber(now) - helper.dateToNumber(past);

    if (secondsAgo < 60)
      return secondsAgo <= 5
        ? "چند لحظه پیش"
        : `${secondsAgo} ثانیه پیش`;
    const minutes = Math.floor(secondsAgo / 60);
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ساعت پیش`;
    const days = Math.floor(hours / 24);
    if (days < 7) return days === 1 ? "دیروز" : `${days} روز پیش`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} هفته پیش`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ماه پیش`;
    const years = Math.floor(days / 365);
    return `${years} سال پیش`;
  };

  const parseUser = (item) => {
    try {
      return JSON.parse(item.logUser || "{}");
    } catch {
      return {};
    }
  };

  const parseInfo = (item) => {
    try {
      return JSON.parse(item.logInfo || "{}");
    } catch {
      return {};
    }
  };
</script>
