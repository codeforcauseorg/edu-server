import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LeadersController } from './leaders.controller';
import { LeadersService } from './leaders.service';

@Module({
    controllers: [LeadersController],
    providers: [LeadersService],
})
export class LeadersModule {

    
}
