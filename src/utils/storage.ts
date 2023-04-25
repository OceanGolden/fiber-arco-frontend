// 默认缓存期限为7天
// const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 1;
const DEFAULT_CACHE_TIME = 60 * 5;

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = () => {
  const storage = localStorage;
  // private storage = sessionStorage;

  /**
   * @description 设置缓存
   * @param {string} key 缓存键
   * @param {*} value 缓存值
   * @param expire
   */
  const set = (key: string, value: any) => {
    const stringData = JSON.stringify(value);
    storage.setItem(key, stringData);
  };

  /**
   * 从缓存删除某项
   * @param {string} key
   */
  const remove = (key: string) => {
    storage.removeItem(key);
  };

  /**
   * 读取缓存
   * @param {string} key 缓存键
   */
  const get = (key: string) => {
    const item = storage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
    // return JSON.stringify(item);
  };

  /**
   * 清空所有缓存
   * @memberOf Cache
   */
  const clear = (): void => {
    storage.clear();
  };

  /**
   * 设置cookie
   * @param {string} name cookie 名称
   * @param {*} value cookie 值
   * @param {number=} expire 过期时间
   * 如果过期时间为设置，默认关闭浏览器自动删除
   * @example
   */
  const setCookie = (name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) => {
    document.cookie = `${name}=${value}; Max-Age=${expire}`;
  };

  /**
   * 根据名字获取cookie值
   * @param name
   */
  const getCookie = (name: string): string => {
    const cookieArr = document.cookie.split('; ');
    for (let i = 0, { length } = cookieArr; i < length; i++) {
      const kv = cookieArr[i].split('=');
      if (kv[0] === name) {
        return kv[1];
      }
    }
    return '';
  };

  /**
   * 根据名字删除指定的cookie
   * @param {string} key
   */
  const removeCookie = (key: string) => {
    setCookie(key, 1, -1);
  };

  /**
   * 清空cookie，使所有cookie失效
   */
  const clearCookie = (): void => {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      keys.forEach((item) => {
        document.cookie = `${item}=0;expire=${new Date(0).toUTCString()}`;
      });
    }
  };

  return {
    set,
    get,
    remove,
    clear,
    getCookie,
    setCookie,
    removeCookie,
    clearCookie,
  };
};

const Storage = createStorage();

export default Storage;
