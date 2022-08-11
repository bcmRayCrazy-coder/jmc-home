export const state = () => ({
  // 这里是全局数据保存的地方
  token: '',
});
// 修改state里面的函数必须用到mutations里面的函数
export const mutations = {
  setToken(state, data) {
    // 每个 mutation 函数都可以接受到两个参数
    // 第一个是 state 对象本身
    // 第二是调用函数时额外添加的数据
    // 这里需要做的就是改变 state 数据
    // 这样外面调用这个函数, 并且传入数据, 即可改变当前的 userInfo 属性
    state.token = data;
  },
};
export const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
};
