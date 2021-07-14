import { Community } from 'src/model/community.model';
import { OperationLog } from 'src/model/operationLog.model';
import { Station } from 'src/model/station.model';

export const repositoryProviders = [
  // 日志
  {
    provide: 'OPERATION_LOG_REPOSITORY',
    useValue: OperationLog,
  },
  // 社区
  {
    provide: 'COMMUNITY_REPOSITORY',
    useValue: Community,
  },
  // 警察局
  {
    provide: 'STATION_REPOSITORY',
    useValue: Station,
  },
];
