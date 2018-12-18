import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

export const menuConfig = (app) => (
  [{
    name: '首页',
    icon: 'setting',
    path: '/index',
    key: 'index',
    component: dynamicWrapper(app, ['index'], () => import('../routes/index/index')),
  }, {
    name: '用户',
    icon: 'share-alt',
    path: '/user',
    key: 'user',
    component: dynamicWrapper(app, ['user'], () => import('../routes/user/user')),
  }, {
    name: '图形化展示',
    icon: 'smile-o',
    path: '/charts',
    key: 'charts',
    children: [{
        name: 'BizCharts',
        icon: 'file-add',
        path: '/bizCharts',
        key: 'bizCharts',
        component: dynamicWrapper(app, [], () => import('../routes/charts/bizCharts')),
      },
      {
        name: 'ECharts',
        icon: 'tool',
        path: '/eCharts',
        key: 'eCharts',
        component: dynamicWrapper(app, [], () => import('../routes/charts/eCharts')),
      }
    ],
  }]
);
