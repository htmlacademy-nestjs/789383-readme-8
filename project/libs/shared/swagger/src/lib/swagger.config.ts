import {DocumentBuilder} from '@nestjs/swagger';

export function createSwaggerConfig(serviceName: string) {
  return new DocumentBuilder()
    .setTitle(`API for ${serviceName}`)
    .setDescription(`OpenAPI documentation for ${serviceName}`)
    .setVersion('1.0')
    .build();
}
