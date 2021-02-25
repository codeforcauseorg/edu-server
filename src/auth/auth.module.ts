import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { FirebaseStrategy } from "./firebase.strategy";
 
@Module({
  imports: [PassportModule],
  providers: [FirebaseStrategy],
  exports: [FirebaseStrategy],
  controllers: [],
})
export class AuthModule { }