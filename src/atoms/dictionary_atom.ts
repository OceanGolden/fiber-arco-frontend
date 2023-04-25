import * as DictionaryService from '@/api/system/dictionary/service';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { SystemStatusEnum } from '@/common/constants';

export const dictAtomFamily = atomFamily((code: string) => {
  // return atom(() =>  DictionaryService.queryItems(code));
  return atom(async () => {
    const data = await DictionaryService.queryItems(code);
    const filterData = data.filter(
      (item) => item.status != SystemStatusEnum.Disable
    );
    return filterData;
  });
});

// export const codeAtom = atom<string>("");
// export const dictAtom = atom(async (get) =>
//   DictionaryService.queryItems(get(codeAtom))
// );
