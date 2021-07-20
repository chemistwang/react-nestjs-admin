import { Inject, Injectable } from '@nestjs/common';
import { Community } from 'src/model/community.model';
import { OperationLog } from 'src/model/operationLog.model';

@Injectable()
export class DemoService {
  constructor(
    @Inject('OPERATION_LOG_REPOSITORY')
    private readonly operationLogRepository: typeof OperationLog,

    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: typeof Community,
  ) {}

  findAllOperation(): Promise<OperationLog[]> {
    return this.operationLogRepository.findAll<OperationLog>();
  }

  findAllCommunity(): Promise<Community[]> {
    return this.communityRepository.findAll<Community>();
  }
}
