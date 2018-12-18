export default {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  effects: {},
  reducers: {
    setState(state, payload) {
      delete payload['type'];
      return {...state, ...payload}
    }
  },  
}