import { selectAtom } from 'jotai/utils';

import { userInfoAsyncAtom } from './user_atom';

import type { UserInfoState } from '@/api/auth/types';

// export const permissionAsyncAtom = atom(async (get) => {
//   const infoAtom = await get(userInfoAsyncAtom);
//   return infoAtom.permissions;
// });

export const permissionsAtom = selectAtom(
  userInfoAsyncAtom,
  (s: UserInfoState) => s.permissions,
);
