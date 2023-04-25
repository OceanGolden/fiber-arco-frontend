import { atomWithStorage } from 'jotai/utils';

import { Token } from '@/common/constants';

export const accessAtomWithLocalStorage = atomWithStorage(Token.Access, '');
export const refreshAtomWithLocalStorage = atomWithStorage(Token.Refresh, '');
