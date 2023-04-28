import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../users/entities/user.entity";


@Entity('files')
export class FileEntity {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    filename: string
    
    @Column()
    originalname: string
    
    @Column()
    size: number
    
    @Column()
    mimetype: string
    
    @ManyToOne(()=> UserEntity, user => user.files)
    user: UserEntity
    
    @DeleteDateColumn()
    deletedAt?: Date
    
    @CreateDateColumn()
    createdAt?: Date
}
