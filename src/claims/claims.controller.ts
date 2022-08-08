import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClaimsService } from './claims.service';
import { CreateClaimsDTO } from './create-claims.dto';
import { storage } from './storage.config';

@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @ApiOperation({
    summary:
      'Post claims to database, its a protected api that needs a bearer token',
  })
  @ApiResponse({
    status: 201,
    description: 'The claim has been successfully saved.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'policy_hard_copy_link', maxCount: 1 },
        { name: 'invoice_hard_copy', maxCount: 1 },
      ],
      { storage },
    ),
  )
  Create(
    @Body() createClaimsDTO: CreateClaimsDTO,
    @UploadedFiles()
    files: {
      policy_hard_copy_link?: Express.Multer.File[];
      invoice_hard_copy?: Express.Multer.File[];
    },
  ) {
    createClaimsDTO.invoice_hard_copy = files.invoice_hard_copy[0].filename;
    createClaimsDTO.policy_hard_copy_link = files.policy_hard_copy_link[0].filename;
    return this.claimsService.create(createClaimsDTO)
  }

  @ApiOperation({
    summary:
      'Get all claims, its a protected api that needs a bearer token',
  })
  @ApiResponse({
    status: 201,
    description: 'Claims have been successfully retrieved.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('all')
  getAllClaims(){
    this.claimsService.getAll()
  }


}
