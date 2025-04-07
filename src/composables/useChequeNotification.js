import { ref, onMounted } from "vue";
import { fetchWrapper } from "src/helpers";
import { sqlOperator } from "src/constants";

const notificationCount = ref(0);

export function useChequeNotification() {
  const fetchNotificationCount = async () => {
    try {
      const response = await fetchWrapper.post(
        "trs/report/getCheckItemData",
        {
          pageSize: 10,
          pageNumber: 1,
          sortColumn: "itemDate",
          sortType: "desc",
          filterExpression: [
            {
              fieldName: "pi.StatusId",
              operator: sqlOperator.in,
              value: "1081,1082",
            },
          ],
        }
      );

      if (response?.data?.data?.items) {
        notificationCount.value = response.data.data.items.length;
      } else {
        notificationCount.value = 0;
      }
    } catch (error) {}
  };

  onMounted(() => {
    fetchNotificationCount();
  });

  return {
    notificationCount,
    fetchNotificationCount,
  };
}
