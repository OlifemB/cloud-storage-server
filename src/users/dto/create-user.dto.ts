import {ApiProperty} from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({
        default: 'admin@cloud.tsx'
    })
    email: string
    
    @ApiProperty({
        default: 'admin'
    })
    fullName: string
    
    @ApiProperty({
        default: 'Admin121'
    })
    password: string
}
