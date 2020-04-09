import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundException
  implements RpcExceptionFilter<EntityNotFoundError> {
  catch(error: EntityNotFoundError, host: ArgumentsHost): Observable<any> {
    return throwError(error);
  }
}
