import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/housekeeper')
@ApiTags('housekeepers')
export class HousekeeperController {}
