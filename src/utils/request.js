import React from 'react';
import axios from 'axios';
import { message, Modal } from 'antd';

const { CancelToken } = axios;
export const requestHandle = {
  cancel: null,
};

window.hasConfirm = false;
function confirmRedirect(message) {
  if (window.hasConfirm) return;
  window.hasConfirm = true;
  Modal.confirm({
    title: '操作失败',
    content: (
      <div>
        <p>{message}</p>
      </div>
    ),
    okText: '回到首页',
    cancelText: '关闭',
    onOk() {
      window.hasConfirm = false;
      window.location.href = '/index.htm';
    },
    onCancel() {
      window.hasConfirm = false;
    },
  });
}

function handleError(ret) {
  if (ret && ret.data && ret.data.status === 0) {
    return ret;
  }

  if (!ret || !ret.data) {
    message.error('网络异常，请稍后重试！');
    return ret;
  }

  const status = ret.data.status || -1;
  const mask = parseInt(status / 100000, 10);
  const msg = ret.data.message;
  switch (mask) {
    case 10105:
    case 10106:
    case 10202:
      confirmRedirect(msg);
      break;
    default:
      // message.error(msg || '未知错误');
      break;
  }
  return ret;
}

function wrapDataWithCsrf(data) {
  return {
    ...data,
    [`${window._csrf && window._csrf.parameterName}`]: window._csrf && window._csrf.token,
  };
}

export const requestPost = (url, data, onSuccess, onError, option) => {
  const requestOption = {
    headers: {
      'Content-Type': option && option.dataType === 'json'
        ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
      [`${window._csrf && window._csrf.headerName}`]: window._csrf && window._csrf.token,
    },
    cancelToken: new CancelToken((c) => {
      requestHandle.cancel = c;
    }),
  };
  if (!option || option.dataType !== 'json') {
    requestOption.transformRequest = (obj) => {
      const arr = [];
      Object.keys(obj).forEach((key) => {
        if (obj[key] !== undefined) {
          arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
      });

      return arr.join('&');
    };
  }

  return axios.post(url, data, requestOption).then(res => handleError(res))
    .then((res) => { onSuccess(res); })
    .catch((err) => { onError(err); });
};

export const requestGet = (url, data, onSuccess, onError) => (
  axios.get(url, {
    params: data,
    cancelToken: new CancelToken((c) => {
      requestHandle.cancel = c;
    }),
  }).then(res => handleError(res))
    .then((res) => { onSuccess(res); })
    .catch((err) => { onError(err); })
);

export const request = ({ url, type = 'get', data, success, error, option }) => {
  const onSuccess = (res) => {
    if (typeof success === 'function') {
      success(res);
    }
  };
  const onError = (err) => {
    if (!axios.isCancel(err)) {
      handleError(err.response);
      if (typeof error === 'function') {
        error(err);
      }
    }
  };
  const param = option && option.noWrap ? data : wrapDataWithCsrf(data);
  if (type === 'get') {
    return requestGet(url, param, onSuccess, onError);
  } if (type === 'open') {
    const finalData = param;
    let finalUrl = url;
    Object.keys(finalData).forEach((k, idx) => {
      finalUrl = idx === 0 ? `${finalUrl}?${k}=${finalData[k]}` : `${finalUrl}&${k}=${finalData[k]}`;
    });
    const newWin = window.open(finalUrl, '_self');
    const winInternal = setInterval(() => {
      if (newWin.closed) {
        clearInterval(winInternal);
        onSuccess();
      }
    }, 1000);
    return;
  }

  return requestPost(url, param, onSuccess, onError, option);
};

export const getUrlParam = (url, key) => {
  const search = url.split('?') && url.split('?')[1];
  if (search) {
    const params = search.split('&');
    const data = {};
    params.forEach((it) => {
      const param = it && it.split('=');
      if (param.length === 2) {
        // data[param[0]] = param[1];
        [data[param[0]]][1] = param;
      }
    });

    return data[key] || '';
  }

  return '';
};

export const convertTimestampToTime = (timestamp) => {
  const date = new Date(timestamp.length === 13 ? timestamp / 1000 : timestamp);
  const y = date.getFullYear();
  const mo = date.getMonth();
  const d = date.getDate();
  const h = date.getHours();
  const mi = date.getMinutes();
  const s = date.getSeconds();
  const Y = `${y}-`;
  const MO = `${mo + 1 < 10 ? `0${mo + 1}` : mo + 1}-`;
  const D = `${d < 10 ? `0${d}` : d} `;
  const H = `${h < 10 ? `0${h}` : h}:`;
  const MI = `${mi < 10 ? `0${mi}` : mi}:`;
  const S = (s < 10 ? `0${s}` : s);
  return Y + MO + D + H + MI + S;
};
