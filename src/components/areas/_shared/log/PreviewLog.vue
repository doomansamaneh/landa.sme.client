<template>
  <q-card flat>
    <q-card-section>
      <div class="invoice-preview-timeline">
        <q-timeline color="accent">
          <q-timeline-entry
            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
            v-for="item in items"
            :key="item"
          >
            <template #default>
              <q-card
                class="bordered-1 no-shadow q-ml-sm"
                :class="
                  $q.screen.gt.xs ? '' : 'q-px-md q-pb-md q-pt-none'
                "
              >
                <q-card-section
                  class="q-pa-sm row justify-between items-center q-gutter-sm"
                >
                  <div class="row items-center">
                    <q-icon
                      :name="item.icon"
                      size="sm"
                      color="accent"
                      class="q-mr-sm"
                    />
                    <div class="text-caption text-bold q-mr-sm">
                      {{ item.name }}
                    </div>
                    <div class="row items-center">
                      <span class="text-caption">چند دقیقه پیش</span>
                      <q-tooltip
                        transition-show="scale"
                        transition-hide="scale"
                        :delay="700"
                        class="custom-tooltip text-caption"
                      >
                        {{ item.date }}
                      </q-tooltip>
                    </div>
                  </div>
                  <q-item-label class="row text-caption">
                    {{ item.systemInfo }}
                  </q-item-label>
                </q-card-section>
                <q-card-section
                  v-if="item.commentValue"
                  class="q-py-sm q-px-sm"
                >
                  <p
                    class="q-mb-none text-caption line-height-xs no-letter-spacing"
                    contenteditable="true"
                    v-show="!editCommentBtn"
                  >
                    {{ item.comment }}
                  </p>
                  <div v-show="editCommentBtn">
                    <q-editor
                      v-model="editCommentValue"
                      class="text-caption"
                    />
                    <div
                      class="q-mt-sm row items-center justify-end q-gutter-x-sm"
                    >
                      <q-btn
                        @click="editCommentBtn = false"
                        padding="4px 12px"
                        flat
                        rounded
                        class="primary-gradient text-white text-body3"
                      >
                        <q-icon
                          name="o_comment"
                          size="xs"
                          class="q-mr-sm"
                        />
                        <span>ذخیره</span>
                      </q-btn>
                      <q-btn
                        @click="editCommentBtn = false"
                        unelevated
                        rounded
                        class="text-on-dark text-body3"
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
                    v-if="!editCommentBtn"
                    class="row q-mt-sm items-center justify-end"
                  >
                    <q-btn
                      @click="editComment"
                      padding="4px 12px"
                      unelevated
                      rounded
                      class="text-on-dark text-body3"
                    >
                      <q-icon
                        name="o_edit"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>ویرایش</span>
                    </q-btn>
                    <q-btn
                      @click="deleteAlert"
                      padding="4px 12px"
                      unelevated
                      rounded
                      class="text-on-dark text-body3"
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
              </q-card>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    entityId: String,
  });

  const $q = useQuasar();

  const editor = ref("");
  const editCommentBtn = ref(false);

  const items = [
    {
      name: "خشایار شمالی",
      icon: "o_add",
      date: "1402/07/22 - 15:05:30",
      value: "ایجاد مخاطب",
      systemInfo: "MacOS 192.188.90.90",
    },
    {
      name: "خشایار شمالی",
      icon: "o_maps_ugc",
      date: "1402/07/22 - 15:05:30",
      value: "ایجاد یادداشت جدید",
      commentValue: "true",
      comment:
        "این یک متن تستی است که توسط خشایار شمالی برای آزمایش کامنت‌ها در تایم لاین سیستم حسابداری آنلاین لاندا ایجاد شده است و فاقد هرگونه اعتباری است.",
      systemInfo: "MacOS 192.188.90.90",
    },
    {
      name: "خشایار شمالی",
      icon: "o_edit",
      date: "1402/07/21",
      value: "ویرایش مخاطب",
      systemInfo: "MacOS 192.188.90.90",
    },
    {
      name: "خشایار شمالی",
      icon: "o_edit",
      date: "1402/07/20",
      value: "ویرایش مخاطب",
      systemInfo: "MacOS 192.188.70.290",
    },
    {
      name: "خشایار شمالی",
      icon: "o_edit",
      date: "1402/07/18",
      value: "ویرایش مخاطب",
    },
    {
      name: "خشایار شمالی",
      icon: "o_edit",
      date: "1402/07/10",
      value: "ویرایش مخاطب",
    },
  ];

  const editCommentValue = ref(items[1].comment);

  const saveComment = () => {
    if (editor.value.trim() !== "") {
      const newComment = {
        name: "خشایار شمالی",
        icon: "comment",
        date: "1402/07/24",
        commentValue: true,
        comment: editor.value,
        systemInfo: "MacOS 192.188.90.90",
      };

      items.push(newComment);
      editor.value = "";
    }
  };

  const deleteComment = (comment) => {
    const index = items.indexOf(comment);
    if (index !== -1) {
      items.splice(index, 1);
    }
  };

  const editComment = () => {
    editCommentBtn.value = !editCommentBtn.value;
  };

  const deleteAlert = () => {
    // $q.dialog({
    //   component: DeleteAlert,
    // });
  };

  onMounted(() => {
    //formStore.getById(id.value);
  });
</script>
