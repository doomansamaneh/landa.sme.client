import { ref } from "vue";

// Simple hash function
const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h).toString();
};

export function useColumnSettings(
  pageName,
  widgetName,
  tableId = null,
  tableStore = null
) {
  const storageKey = "columnSettings";

  // Generate unique table identifier
  const getTableId = () => {
    if (tableId) return tableId;
    if (tableStore?.columns?.value) {
      const columns = tableStore.columns.value
        .map((c) => c.name)
        .sort()
        .join(",");
      return hash(columns);
    }
    return hash(pageName + widgetName);
  };

  const uniqueTableId = getTableId();

  // Get all settings
  const getSettings = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  };

  // Save all settings
  const saveSettings = (settings) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save column settings:", e);
    }
  };

  // Get settings for this specific table
  const getTableSettings = () => {
    const settings = getSettings();
    return settings[uniqueTableId] || null;
  };

  // Save settings for this specific table
  const saveTableSettings = (tableSettings) => {
    const settings = getSettings();
    settings[uniqueTableId] = tableSettings;
    saveSettings(settings);
  };

  // Column visibility helpers
  const getColumnVisibility = () =>
    getTableSettings()?.columnVisibility || {};
  const saveColumnVisibility = (visibility) => {
    const current = getTableSettings() || {};
    saveTableSettings({ ...current, columnVisibility: visibility });
  };

  const getOriginalStates = () =>
    getTableSettings()?.originalStates || {};
  const saveOriginalStates = (states) => {
    const current = getTableSettings() || {};
    saveTableSettings({ ...current, originalStates: states });
  };

  const clearSettings = () => {
    const settings = getSettings();
    delete settings[uniqueTableId];
    saveSettings(settings);
  };

  return {
    getColumnVisibility,
    saveColumnVisibility,
    getOriginalStates,
    saveOriginalStates,
    clearSettings,
    resetToDefault: clearSettings,
  };
}
