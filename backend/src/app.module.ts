import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';

import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [HeroModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
