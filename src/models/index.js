export default {
  namespace: 'index',
  state: {},
  effects: {},
  reducers: {
    setState(state, payload) {
      delete payload['type'];
      return {...state, ...payload}
    }
  },  
}