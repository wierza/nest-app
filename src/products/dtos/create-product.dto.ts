import { IsInt, IsNotEmpty, Length, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    description: string;
  }