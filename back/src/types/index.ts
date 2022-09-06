import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger";

export class FailedRequestResponse {
    @ApiProperty()
    status: `${HttpStatus}`

    @ApiProperty()
    error: string;
}
export class TypesFailedResponse extends FailedRequestResponse {
    @ApiProperty()
    message: string[] | string
}