import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, Job as JobM } from './schemas/job.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobM.name, schema: JobSchema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
