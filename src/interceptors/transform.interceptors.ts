import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        throw new Error("Method not implemented.");
    }
    interceptor(_, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map((data) => ({data})));
    }
}