import { HandleRouterType } from "@/@types/generic.types";

export const resolveEnableItem = (handle: HandleRouterType, isUserMaster?: boolean) => {
  const handleEnable = handle.showSideMenu;

  if (!handleEnable) return false;

  if (handle.isMaster === true) {
    return isUserMaster === true;
  }

  return true;
}