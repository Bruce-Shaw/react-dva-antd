import { request } from '../utils/request';

export function getDataListPages(params) {
  return request('/getDataListPages.json', {
    type: 'get',
  });
}
