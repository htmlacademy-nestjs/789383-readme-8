import {applyDecorators, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {PostRdo} from "../rdo/post.rdo";

export function CreatePostApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({summary: 'Create a new post'}),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Post successfully created',
      type: PostRdo,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
  );
}

export function GetPostByIdApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({summary: 'Get post by id'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully found',
      type: PostRdo
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    }),
  );
}

export function UpdatePostApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({summary: 'Update post by id'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully updated',
      type: PostRdo
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
    }),
  );
}

export function DeletePostApiDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({summary: 'Delete post by id'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully deleted',
      schema: {
        example: { message: 'Post deleted' },
      },
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    }),
  );
}

export function RepostApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Create a repost of existing post'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully reposted',
      type: PostRdo
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    })
  );
}


export function LikePostApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Like a post'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully liked',
      type: PostRdo
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    })
  );
}


export function UnlikePostApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Unlike a post'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post successfully unliked',
      type: PostRdo
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'There is no post with this id',
    })
  );
}
