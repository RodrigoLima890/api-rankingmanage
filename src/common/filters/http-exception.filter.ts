import { Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{

    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception:unknown, httpHost:ArgumentsHost){
        const ctx = httpHost.switchToHttp();

        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = (exception instanceof HttpException)? exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(`Http Status ${statusCode}\n Erro Message: ${JSON.stringify(message)}`);

        response.status(statusCode).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        })

    }

}