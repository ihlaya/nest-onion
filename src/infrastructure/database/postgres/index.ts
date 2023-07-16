import { ConfigService } from '@nestjs/config';
import {
  EnvObjects,
  PostgressOptions,
} from 'infrastructure/config/env.objects';

export const PostgressConfig = {
  get(configService: ConfigService) {
    const data = configService.get<PostgressOptions>(
      EnvObjects.POSTGRESS_OPTIONS,
    );
    return { ...data };
  },
};
