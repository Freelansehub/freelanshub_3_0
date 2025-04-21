import { call, put } from "redux-saga/effects";
import { ResultCodeEnum } from "../redux/configureApi";
 


export function* handleRequest<F extends (...args: any[])=> Promise<any>>(
    apiQuery: F,
    errorAction: string, 
    ...args: Parameters<F>
): Generator<any, ReturnType<F>, any> {
    try {
        const response: Awaited<ReturnType<F>> = yield call(apiQuery, ...args);
        if ('data' in response) {
            return response.data;
        } else {
            yield put({ type: errorAction, errors: response.errors, resultCode: response.resultCode });
            throw new Error('nice try');
        }
    } catch (error) {
        yield put({ type: errorAction, errors: ['An unexpected error occurred'],  resultCode: ResultCodeEnum.Error })
        throw new Error('nice try');
    }

}