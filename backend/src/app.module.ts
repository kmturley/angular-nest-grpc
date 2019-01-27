import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';

import { LoggerMiddleware } from './logger.middleware';
import { HeroController } from './hero/hero.controller';

@Module({
  imports: [HeroModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
