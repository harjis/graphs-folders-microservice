import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { FoldersService } from '../services/folders.service';
import { KafkaMessage } from 'kafkajs';

// This controllers purpose actually is not to serve HTTP requests
// This is needed only for handling messages from kafka. For some reason
// The EventPattern needs to be defined on Controller so that it gets executed
@Controller('folders')
export class FoldersController {
  constructor(private folderService: FoldersService) {}
  @EventPattern('Folder.events')
  onFolderEvent(@Payload() message: KafkaMessage) {
    this.folderService.processFolderEvent(message);
  }
}
