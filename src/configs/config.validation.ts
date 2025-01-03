import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ConfigSchema } from './config.schema';

export function configValidate(config: Record<string, unknown>): ConfigSchema {
  const validatedConfig = plainToInstance(ConfigSchema, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        return `${error.property}: ${Object.values(error.constraints).join(', ')}`;
      })
      .join('; ');
    throw new Error(`Config validation failed: ${errorMessages}`);
  }
  return validatedConfig;
}
