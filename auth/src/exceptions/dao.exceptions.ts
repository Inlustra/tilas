import { HttpException } from '@nestjs/core'
import { HttpCode, HttpStatus } from '@nestjs/common';

export const ModelNotFoundException = model =>
  new HttpException(`${model} not found`, 404)

export const ModelAlreadyExistsException = model =>
  new HttpException(`${model} already exists`, HttpStatus.CONFLICT)
