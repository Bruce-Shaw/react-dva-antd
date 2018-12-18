import {stringify} from 'qs';
import request from '../utils/request';

export function getDataListPages(params) {
  return request('/getDataListPages.json', {
    method: 'get',
    body: params,
  });
}
