import {applyDecorators, HttpStatus} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentRdo } from '../rdo/comment.rdo';

export function CreateCommentApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new comment' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Comment successfully created',
      type: CommentRdo,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    })
  );
}

export function DeleteCommentApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a comment by id' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Comment successfully deleted',
      schema: {
        example: { message: 'Comment deleted' },
      },
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Comment not found',
    })
  );
}

export function GetCommentsByPostApiDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all comments for a specific post' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Comments successfully retrieved',
      type: CommentRdo,
      isArray: true,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Post not found',
    })
  );
}
