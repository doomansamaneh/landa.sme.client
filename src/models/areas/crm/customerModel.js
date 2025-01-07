import "src/helpers/extensions";
import { customerType, gender } from "src/constants";

export const customerModel = {
  isActive: true,
  typeId: customerType.legal,
  marketingPercent: 0,
  roleIds: [],
  person: { gender: gender.male },
  customerBusiness: {},
  customerAddresses: [],
  customerContactPhones: [],
  customerContactMobiles: [],
  customerContactEmails: [],
  customerContactWebsites: [],
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
