import { ResponseFormatter } from "App/utils";

declare module '@ioc:Adonis/Core/Response' {
	interface ResponseContract {
		formatter(data: any, status?: number, message?: any, error?: boolean): ResponseFormatter
	}
}
