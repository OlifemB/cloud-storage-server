import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) {
    }
    
    async findByEmail(email: string) {
        return this.repository.findOneBy({email})
    }
    
    async findById(id: number) {
        return this.repository.findOneBy({id})
    }
    
    async findByName(fullName: string) {
        return this.repository.findOneBy({fullName});
    }
    
    
    create(dto: CreateUserDto) {
        return this.repository.save(dto)
    }
    
    //
    // findAll() {
    //   return `This action returns all users`;
    // }
    //
    //
    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
}
