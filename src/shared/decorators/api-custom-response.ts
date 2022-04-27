import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dtos/response.dto';

export const ApiCustomResponse = <MODEL extends Type>(model: MODEL) => {
  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: { type: 'object', $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
