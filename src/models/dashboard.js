import dashboardService from '@/service/dashboard';


export default {
    namespace: 'dashboard',

    state: {
        sysVersion: [{
            osVersion: 'V0.9.0',
            osName: '上线版',
            isHistory: '1',
            osDate: '2020-03-17',
            osProgress: 1.0,
            osRemark: '历史版本',
        },{
            osVersion: 'V0.9.1',
            osName: '上线版2',
            isHistory: '1',
            osDate: '2020-03-187',
            osProgress: 1.0,
            osRemark: '历史版本2',
        },{
            osVersion: 'V1.1.0',
            osName: 'dev版',
            isHistory: '0',
            osDate: '2020-05-08',
            osProgress: 0.67,
            osRemark: '正在开发',
        }],
        saData: 
        { 
            page: 1, 
            record: 1, 
            total: 1 ,
            rows: [{
                id: 1,
                moduleId: 'test',
                moduleName: 'test',
                moduleVersion: 'test',
                moduleProgress: 0,
                serviceName:'test',
                serviceProgress: 0.2,
                function: 'test',
                codeBranch: 'test',
                serviceTag: 'test',
                manager: 'test',
                os: ['os_test1', 'os_test2'],
                appName: 'route_service',
              }], 
            },
    },

    effects: {
        * getAllOS(_, { put, call }) {
            const {data} = yield call(
                dashboardService.getAllOS,
            );
            yield put({ type: 'setSysVersion', payload: data });
        },

        * getAllService({ payload }, {put, call}) {
            const { page, pageSize } = payload;
            const {data} = yield call(
                dashboardService.getAllService,
                { page, pageSize }
            );
            yield put({ type: 'setCurrentService', payload: data })
        }
    },

    reducers: {
        setSysVersion(state, { payload }) {
            return {
                ...state,
                sysVersion: payload,
            };
        },

        setCurrentService(state, {payload}) {
            return {
                ...state,
                saData: payload,
            };
        },

    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (query.tab === 'sysVersion') {
                    dispatch({ type: 'getAllOS' });
                }
                if (query.tab === 'saVersion') {
                    dispatch({ type: 'getAllService',
                    payload : {page:1, pageSize:10} });
                }
            });
        }
    }
};
