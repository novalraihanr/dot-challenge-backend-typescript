import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class InsertBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  total_page: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  current_page?: number;

  @IsOptional()
  doneReading?: boolean;
}

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  total_page?: number;

  @IsString()
  @IsOptional()
  author?: string;

  @IsOptional()
  current_page?: number;

  @IsOptional()
  doneReading?: boolean;
}
