import {applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {ApiBearerAuth} from "@nestjs/swagger";

export const Payload = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);

export function UserAuth() {
    return applyDecorators(
        UseGuards(AuthGuard('jwt')),
        ApiBearerAuth(),
    );
}
