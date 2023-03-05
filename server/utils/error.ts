import type { Request, Response } from 'express';

export const unhandledExceptionsHandler = (asyncFunction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>) => {
	return async (request: Request, response: Response) => {
		try {
			await asyncFunction(request, response);
		} catch (error) {
			console.error(error);
			response.status(500).send({ message: 'Something went wrong!' });
		}
	};
};
