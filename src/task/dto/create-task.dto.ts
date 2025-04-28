import { IsInt, IsString } from "class-validator";

export class CreateTaskDto {


  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsInt()
  userId: number;


}
