;
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { TopicModule } from './topic/topic.module';
import { SubjectModule } from './subject/subject.module';
import { ContentModule } from './content/content.module';
import { UploadServiceModule } from './upload-service/upload-service.module';
import { TeacherModule } from './teacher/teacher.module';
import { PurchaseModule } from './purchase/purchase.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
  LoggerModule.forRoot({
    pinoHttp:{
      level:"debug",
     
    }
  }),
  JwtModule.register({
    global: true,
    secret: process.env.jwt ,
    signOptions: { expiresIn: '5d' },
    
  }),
  MongooseModule.forRoot(process.env.MONGODBURL as string, {
    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => console.log('connected'));
      connection.on('open', () => console.log('open'));
      connection.on('disconnected', () => console.log('disconnected'));
      connection.on('reconnected', () => console.log('reconnected'));
      connection.on('disconnecting', () => console.log('disconnecting'));
      
  
      return connection;
    },
    autoIndex:false
  }),
  UserModule,
  ClassModule,
  TopicModule,
  SubjectModule,
  ContentModule,
  UploadServiceModule,
  TeacherModule,
  PurchaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
