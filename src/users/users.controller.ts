import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UserId} from "../auth/decorators/user-id.decorator";


@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }
    
    @Get('/me')
    @UseGuards(JwtAuthGuard)
    getMe(@UserId() id: number) {
        return this.usersService.findById(id)
    }
    
    // @Get()
    // findAll() {
    //   return this.usersService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.usersService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.usersService.update(+id, updateUserDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.usersService.remove(+id);
    // }
}
