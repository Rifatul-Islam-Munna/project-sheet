import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreatePurchaseDto {

    @IsMongoId()
    @IsNotEmpty()
 @ApiPropertyOptional({ example: 'fafafaf', description: 'Reference to the Class ID' })
    subjectId: string

}
