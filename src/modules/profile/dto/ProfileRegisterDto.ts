'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRegisterDto } from '../../auth/dto/UserRegisterDto';

export class ProfileRegisterDto {
    @ApiProperty()
    @IsString({ message: 'username string type error' })
    @IsNotEmpty({ message: 'username field is empty' })
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'name string type error' })
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'liveSchedule string type error' })
    user: UserRegisterDto;
}
