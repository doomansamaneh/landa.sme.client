export function useCrudMenu(context, type) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return [
    {
      ...menuItems.edit,
      permission: `${type}.edit`,
      route: `/${type}/edit/${context.activeRow?.id}`,
      visible: hasId,
    },
    {
      ...menuItems.copy,
      permission: `${type}.clone`,
      route: `/${type}/copy/${context.activeRow?.id}`,
      visible: hasId,
    },
    {
      ...menuItems.delete,
      permission: `${type}.delete`,
      handler: () => {
        if (hasSelection) context.deleteBatch?.();
        else if (hasId) context.deleteById?.();
      },
      visible: hasId || hasSelection,
    },
  ];
}
