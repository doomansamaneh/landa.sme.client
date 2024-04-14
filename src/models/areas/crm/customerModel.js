import "src/helpers/extensions";
import { customerType, gender } from "src/constants";

export const customerModel = {
  isActive: true,
  typeId: customerType.legal,
  roleIdList: [],
  person: {
    genderId: gender.male,
  },
  customerBusiness: {},
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
