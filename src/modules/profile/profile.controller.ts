import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    Crud,
    CrudController,
    CrudRequest,
    Override,
    ParsedBody,
    ParsedRequest,
} from '@nestjsx/crud';

import { ProfileRegisterDto } from './dto/ProfileRegisterDto';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Crud({
    model: {
        type: ProfileEntity,
    },
    params: {
        id: {
            field: 'id',
            type: 'string',
            primary: true,
        },
    },
    dto: {
        create: ProfileRegisterDto,
        update: ProfileRegisterDto,
    },
    query: {
        limit: 10,
        cache: 2000,
        alwaysPaginate: true,
        join: {
            user: {
                eager: true,
            },
        },
    },
    routes: {
        exclude: ['createManyBase', 'replaceOneBase'],
    },
})
@Controller('profile')
@ApiTags('profile')
export class ProfileController implements CrudController<ProfileEntity> {
    constructor(public service: ProfileService) {}

    get base(): CrudController<ProfileEntity> {
        return this;
    }

    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: ProfileRegisterDto,
    ) {
        const profile = await this.service.findOne({
            where: { username: dto.username },
        });
        if (profile) {
            return this.service.updateOne(req, profile);
        }
        return this.service.createOne(req, dto);
    }
}
