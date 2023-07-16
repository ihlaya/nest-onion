import { plainToClass } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  POSTGRESS_CLIENT_URL: string;
  @IsNotEmpty()
  POSTGRESS_DB_NAME: string;
  @IsNotEmpty()
  POSTGRESS_USER: string;
  @IsNotEmpty()
  POSTGRESS_PORT: string;
  @IsNotEmpty()
  POSTGRESS_PASS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
