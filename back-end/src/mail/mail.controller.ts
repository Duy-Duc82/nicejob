import { MailService } from './mail.service';
import { Controller, Get } from '@nestjs/common';
import { Public, ResponseMessage } from '@app/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Subscriber,
  SubscriberDocument,
} from '@app/subscribers/schemas/subscriber.schema';
import { Job, JobDocument } from '@app/jobs/schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  @Cron('59 11 * * 6') // Every Saturday at 11:59 AM
  async handleTestEmail() {
    const subscribers = await this.subscriberModel.find({});
    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobsWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });
      if (jobsWithMatchingSkills?.length) {
        const jobs = jobsWithMatchingSkills.map((job) => {
          return {
            name: job.name,
            skills: job.skills,
            company: job.company,
            salary:
              `${job.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND',
            url: `https://itviec.com/job/${job._id}`,
          };
        });
        await this.mailerService.sendMail({
          to: subs.email, // list of receivers
          from: 'Support Team <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'job',
          context: {
            receiver: subs.name,
            jobs: jobs,
            ctaUrl: 'https://itviec.com',
          },
        });
      }
    }

    return { message: 'Email sent!' };
  }
}
