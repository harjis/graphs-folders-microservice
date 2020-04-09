import { catchError, switchMap } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';

import { Graph } from '../entities/graph.entity';
import { FolderDto } from '../../dtos/folder.dto';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Graph)
    private readonly graphRepository: Repository<Graph>,
    @Inject('FOLDERS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async all(): Promise<Graph[]> {
    return this.graphRepository.find();
  }

  create(graph: Graph) {
    return this.getFolder(graph.folderId).pipe(
      switchMap(result => {
        return this.graphRepository.save(graph);
      }),
      catchError(err => {
        return of(err);
      }),
    );
  }

  private getFolder(folderId: number): Observable<FolderDto> {
    return this.client.send({ cmd: 'getFolder' }, folderId);
  }
}
