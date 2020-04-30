import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedException
  implements RpcExceptionFilter<QueryFailedError> {
  catch(error: QueryFailedError, host: ArgumentsHost): Observable<any> {
    return throwError(error.message);
  }
}
