import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe, MaxFileSizeValidator, UseGuards, Query
} from '@nestjs/common';
import {FilesService} from './files.service';
import {UpdateFileDto} from './dto/update-file.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storage";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UserId} from "../auth/decorators/user-id.decorator";
import {FileType} from "./files.types";


@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }
    
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: fileStorage,
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    create(@UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})]
            })
        ) file: Express.Multer.File,
        @UserId() userId: number
    ) {
        return this.filesService.create(file, userId)
    }
    
    
    @Get()
    findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
        return this.filesService.findAll(userId, fileType);
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.filesService.findOne(+id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
        return this.filesService.update(+id, updateFileDto);
    }
    
    @Delete()
    remove(@UserId() userId: number, @Query('ids') ids: string) {
        // files?ids=1,2,7,8
        return this.filesService.remove(userId, ids);
    }
}
