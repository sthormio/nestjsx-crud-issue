import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileService extends TypeOrmCrudService<ProfileEntity> {
    constructor(@InjectRepository(ProfileEntity) repo) {
        super(repo);
    }
}
