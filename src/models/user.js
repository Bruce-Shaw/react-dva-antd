import { getDataListPages } from '../services/user';

export default {
  namespace: 'user',
  state: {
    pages: [],
    pageObj: {
      pageNow: 1,
      pageSize: 10,
      totalCount: 0,
    },
    loading: false,
  },
  effects: {
    * getDataListPages({ payload }, { call, put }) {
      const response = yield call(getDataListPages, payload);
      yield put({
        type: 'setState',
        payload: response,
      });
    },
  },
  reducers: {
    setState(state, payload) {
      delete payload['type'];
      return {...state, ...payload}
    }
  },  
}