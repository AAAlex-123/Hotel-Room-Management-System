import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class MomentService {
   moment(date?: string): moment.Moment {
    return date ? moment(date) : moment();
  }
}
