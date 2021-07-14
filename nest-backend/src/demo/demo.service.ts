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

  async findAllOperation(): Promise<OperationLog[]> {
    const data = await this.operationLogRepository.findAll<OperationLog>();
    return data;
  }

  async findAllCommunity(): Promise<Community[]> {
    return await this.communityRepository.findAll<Community>();
  }
}
