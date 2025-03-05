<template>
  <div flat>
    <q-card-section class="no-padding">
      <div
        class="text-body1"
        :class="$q.screen.gt.xs ? 'q-mb-md' : 'q-mb-md'"
      >
        <q-icon name="o_comment" size="sm" class="icon q-pr-sm" />
        {{ $t("shared.labels.note") }}
      </div>
      <q-form ref="addNoteForm">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <q-editor
              class="border-radius-sm"
              v-model="noteModel.comment"
              placeholder="در اینجا می‌توانید یادداشت بگذارید..."
            />
            <q-btn
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

        <div>
          <q-btn
            round
            unelevated
            dense
            class="text-on-dark"
            icon="o_refresh"
            @click="callBack"
          >
            <q-tooltip class="custom-tooltip">
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <div class="q-px-sm">
        <q-timeline>
          <q-timeline-entry
            v-for="item in items"
            :key="item.id"
            :color="$q.dark.isActive ? 'yellow' : 'primary'"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            
          >
            <q-card bordered class="border-radius-sm">
              <q-card-section>
                <div
                  class="row justify-between items-center q-gutter-sm"
                >
                  <div class="row">
                    <q-icon
                      :name="getIconName(item)"
                      size="16px"
                      color="accent"
                      class="q-mr-sm"
                    />
                    <span class="text-caption text-bold">
                      {{ JSON.parse(item.logUser).name }}
                    </span>

                    <span class="q-px-sm text-caption">
                      {{ getTime(item) }}
                      <q-tooltip
                        class="glass_ custom-tooltip"
                        transition-show="scale"
                        transition-hide="scale"
                        anchor="center left"
                        self="center right"
                        :offset="[10, 10]"
                      >
                        {{ item.logTime }}
                      </q-tooltip>
                    </span>
                  </div>
                  <div>
                    <div class="flex q-gutter-sm text-caption">
                      <div>
                        {{ JSON.parse(item.logUser).ip }}
                      </div>
                      <div>
                        {{ JSON.parse(item.logUser).userAgent }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section v-if="item.comment">
                <div
                  v-html="item.comment"
                  class="line-height-sm"
                  v-show="editItemId !== item.id"
                />
                <div
                  class="q-gutter-y-md"
                  v-show="editItemId === item.id"
                >
                  <q-editor v-model="item.comment" />
                  <div class="q-gutter-x-sm">
                    <q-btn
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
                      @click="disableEdit(item)"
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
                    @click="enableEdit(item)"
                    unelevated
                    rounded
                    class="text-on-dark"
                  >
                    <q-icon name="o_edit" size="xs" class="q-mr-sm" />
                    <span>ویرایش</span>
                  </q-btn>
                  <q-btn
                    @click="deleteComment(item)"
                    unelevated
                    rounded
                    class="text-on-dark"
                  >
                    <q-icon
                      name="o_delete"
                      size="xs"
                      class="q-mr-sm"
                    />
                    <span>حذف</span>
                  </q-btn>
                </div>
              </q-card-section>

              <!-- <q-card-section v-if="item?.logInfo">

                {{ item.logInfo }}
                <span
                  v-if="JSON.parse(item.logInfo).receiverEmail"
                  class="q-pr-xs"
                >
                  ارسال ایمیل به:
                  {{ JSON.parse(item.logInfo).receiverEmail }} -
                </span>
                <span>
                  {{ JSON.parse(item.logInfo).subject }}
                </span>
              </q-card-section> -->
            </q-card>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-card-section>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";
  import { logType } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { helper } from "src/helpers";
  import "src/helpers/extensions";

  const props = defineProps({
    items: Array,
    entityId: String,
    entityName: String,
    callBack: Function,
  });

  const $q = useQuasar();
  const addNoteForm = ref(null);
  const noteModel = ref({
    entityId: props.entityId,
    entityName: props.entityName,
    comment: null,
  });

  const formStore = useFormActions("cmn/entityNote");
  const addComment = async () => {
    const responseData = await formStore.customPostAction(
      "create",
      noteModel.value
    );
    if (props.callBack) props.callBack();
  };

  const editComment = async (item) => {
    const responseData = await formStore.customPostAction("edit", {
      id: item.id,
      comment: item.comment,
    });
    disableEdit(item);
  };

  const deleteComment = async (item) => {
    const responseData = formStore.deleteById(item.id, () => {
      if (props.callBack) props.callBack();
    });
    // const index = items.indexOf(item.id);
    // if (index !== -1) {
    //   items.splice(index, 1);
    // }
  };

  const editItemId = ref(null);
  const disableEdit = (item) => {
    editItemId.value = null;
  };

  const enableEdit = (item) => {
    editItemId.value = item.id;
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

  function timeDifference(past, now) {
    return helper.dateToNumber(now) - helper.dateToNumber(past);
  }

  const getTime = (item) => {
    const past = helper.parseDateString(item.logTime);
    const now = helper.parseDateString(new Date().toDateTimeString());

    const secondsAgo = timeDifference(past, now);

    if (secondsAgo < 60) {
      return secondsAgo <= 5
        ? "چند لحظه پیش"
        : `${secondsAgo} ثانیه پیش`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} دقیقه پیش`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} ساعت پیش`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return daysAgo === 1 ? "دیروز" : `${daysAgo} روز پیش`;
    }

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo} هفته پیش`;
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
      return `${monthsAgo} ماه پیش`;
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo} سال پیش`;
  };
</script>
