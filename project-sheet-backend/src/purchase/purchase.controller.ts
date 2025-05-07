import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, ExpressRequest } from 'src/auth/auth.guard';

@Controller('purchase')
@ApiTags('purchase')
@UseGuards(AuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto,@Req() req:ExpressRequest) {
    return this.purchaseService.create(createPurchaseDto,req?.user?.id);
  }

  @Get()
  findAll(@Req() req:ExpressRequest) {
    return this.purchaseService.findAll(req?.user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
