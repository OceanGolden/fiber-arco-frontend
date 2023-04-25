import { selectAtom } from 'jotai/utils';

import { userInfoAsyncAtom } from './user_atom';

import type { UserInfoState } from '@/api/auth/types';

// export const menuAsyncAtom = atom(async (get) => {
//   const infoAtom = await get(userInfoAsyncAtom);
//   return infoAtom.menus;
// });

export const menusAtom = selectAtom(
  userInfoAsyncAtom,
  (s: UserInfoState) => s.menus,
);
