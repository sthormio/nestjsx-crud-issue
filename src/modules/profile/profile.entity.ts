import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'profile' })
export class ProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 100,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 100,
    })
    name: string;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.profile)
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;
}
