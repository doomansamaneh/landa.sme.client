import { ref, computed } from "vue";

// Helper function to generate a consistent hash from string
function generateHash(str) {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
}

/**
 * Composable for managing column settings in localStorage
 * Follows the pattern: setting: { page: { name: "page1", widgets: [{ name: "widget1", setting: {...} }] } }
 */
export function useColumnSettings(
  pageName,
  widgetName,
  tableId = null,
  tableStore = null
) {
  const storageKey = "columnSettings";

  // Create consistent identifier for this table
  // If tableId is provided, use it; otherwise create a consistent ID based on table content
  const generateTableId = () => {
    if (tableId) return tableId;

    // Try to generate ID based on table columns if available
    if (tableStore?.columns?.value) {
      const columnNames = tableStore.columns.value
        .map((col) => col.name)
        .sort()
        .join(",");
      return `${pageName}_${widgetName}_${generateHash(columnNames)}`;
    }

    // Fallback to page and widget names
    return `${pageName}_${widgetName}_${generateHash(
      pageName + widgetName
    )}`;
  };

  const uniqueTableId = generateTableId();

  // Get current settings from localStorage
  const getSettings = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error(
        "Failed to parse column settings from localStorage:",
        error
      );
      return {};
    }
  };

  // Save settings to localStorage
  const saveSettings = (settings) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (error) {
      console.error(
        "Failed to save column settings to localStorage:",
        error
      );
    }
  };

  // Get column settings for specific page and widget
  const getColumnSettings = () => {
    const settings = getSettings();
    const page = settings[pageName];

    if (!page) return null;

    const widget = page.widgets?.find(
      (w) => w.name === widgetName && w.tableId === uniqueTableId
    );
    return widget?.setting || null;
  };

  // Save column settings for specific page and widget
  const saveColumnSettings = (columnSettings) => {
    const settings = getSettings();

    // Initialize page if it doesn't exist
    if (!settings[pageName]) {
      settings[pageName] = {
        name: pageName,
        widgets: [],
      };
    }

    // Find existing widget or create new one
    let widget = settings[pageName].widgets.find(
      (w) => w.name === widgetName && w.tableId === uniqueTableId
    );
    if (!widget) {
      widget = {
        name: widgetName,
        tableId: uniqueTableId,
        setting: {},
      };
      settings[pageName].widgets.push(widget);
    }

    // Update widget settings
    widget.setting = columnSettings;

    // Save to localStorage
    saveSettings(settings);
  };

  // Get column visibility settings
  const getColumnVisibility = () => {
    const settings = getColumnSettings();
    return settings?.columnVisibility || {};
  };

  // Save column visibility settings
  const saveColumnVisibility = (visibilitySettings) => {
    const currentSettings = getColumnSettings() || {};
    currentSettings.columnVisibility = visibilitySettings;
    saveColumnSettings(currentSettings);
  };

  // Get original column states
  const getOriginalColumnStates = () => {
    const settings = getColumnSettings();
    return settings?.originalStates || {};
  };

  // Save original column states
  const saveOriginalColumnStates = (originalStates) => {
    const currentSettings = getColumnSettings() || {};
    currentSettings.originalStates = originalStates;
    saveColumnSettings(currentSettings);
  };

  // Clear all settings for a specific page/widget
  const clearSettings = () => {
    const settings = getSettings();
    if (settings[pageName]) {
      settings[pageName].widgets = settings[pageName].widgets.filter(
        (w) => !(w.name === widgetName && w.tableId === uniqueTableId)
      );

      // Remove page if no widgets left
      if (settings[pageName].widgets.length === 0) {
        delete settings[pageName];
      }

      saveSettings(settings);
    }
  };

  // Reset to default (clear settings)
  const resetToDefault = () => {
    clearSettings();
  };

  return {
    getColumnSettings,
    saveColumnSettings,
    getColumnVisibility,
    saveColumnVisibility,
    getOriginalColumnStates,
    saveOriginalColumnStates,
    clearSettings,
    resetToDefault,
  };
}
