// const useMenus = (): [MenuRecord[], boolean] => {
//   const loadableAtom = loadable(menuAsyncAtom);
//   const value = useAtomValue(loadableAtom);
//   switch (value.state) {
//     case 'hasData':
//       return [value.data, false];
//     case 'loading':
//       return [[], true];
//     case 'hasError':
//       return [[], true];
//     default:
//       return [[], false];
//   }
// };

// export default useMenus;
