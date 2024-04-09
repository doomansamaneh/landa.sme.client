import "src/helpers/extensions";
const dateTime = new Date();

export const customerModel = {
  isActive: true,
};

export const customerBatchModel = {
  type: {
    fieldName: "TypeId",
    isModified: false,
  },
  unit: {
    fieldName: "UnitId",
    isModified: false,
  },
  job: {
    fieldName: "JobId",
    isModified: false,
  },
};
