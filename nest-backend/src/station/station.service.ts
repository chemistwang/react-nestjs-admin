import { Inject, Injectable } from '@nestjs/common';
import { CreateStationDto } from 'src/dto/station/create-station.dto';
import { UpdateStationDto } from 'src/dto/station/update-station.dto';
import { Station } from 'src/model/station.model';

@Injectable()
export class StationService {
  constructor(
    @Inject('STATION_REPOSITORY')
    private readonly stationRepository: typeof Station,
  ) {}

  async create(s: CreateStationDto) {
    const { stationName, creator } = s;
    return await this.stationRepository.create({ stationName, creator });
  }

  async remove(id: string) {
    // return await this.stationRepository.destroy({
    //   where: { id },
    // });

    const station = await this.findOne(id);
    if (station) {
      return station.destroy();
    }
    return 'not exist, delete failure';
  }

  async update(id: string, upS: UpdateStationDto) {
    const station = await this.findOne(id);
    if (station) {
      return await this.stationRepository.update(
        {
          stationName: upS.stationName,
        },
        {
          where: {
            id,
          },
        },
      );
    }
    return 'not exist, update failure';
  }

  async find() {
    return await this.stationRepository.findAll({
      order: [['create_date', 'DESC']],
    });
  }

  async findOne(id: string) {
    return await this.stationRepository.findOne({
      where: {
        id,
      },
    });
  }
}
