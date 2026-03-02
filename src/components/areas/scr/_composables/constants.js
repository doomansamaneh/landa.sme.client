import {
  name,
  loginName,
  userName,
  fromIp,
  toIp,
  isActive,
} from "src/constants/columns";

export const userColumns = [{ ...name }, { ...loginName }];
export const ipRangeColumns = [
  { ...userName },
  { ...loginName },
  { ...fromIp },
  { ...toIp },
  { ...isActive },
];
