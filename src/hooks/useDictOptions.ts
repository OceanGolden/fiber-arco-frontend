import type { DictionaryItemRecord } from '@/api/system/dictionary_item/type';
import { dictAtomFamily } from '@/atoms/dictionary_atom';
import { loadable } from 'jotai/utils';
import { useAtomValue } from 'jotai';

const useDictOptions = (code: string): [DictionaryItemRecord[], boolean] => {
  const loadableAtom = loadable(dictAtomFamily(code));
  const value = useAtomValue(loadableAtom);
  switch (value.state) {
    case 'hasData':
      return [value.data, false];
    case 'loading':
      return [[], true];
    case 'hasError':
      return [[], true];
    default:
      return [[], false];
  }
};

export default useDictOptions;
