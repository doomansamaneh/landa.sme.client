import { usePreviewMenu } from "../menus/usePreviewMenu";

export function useBaseInfoPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: context.baseRoute?.replace("/", "."),
  });
}
