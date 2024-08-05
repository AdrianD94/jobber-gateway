import { AuthService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface IController {
    path: string;
    router: Router;
};

export class SearchController implements IController {
    public path: string = '/auth';
    public router = Router();

    constructor(private authService: AuthService) {
        this.initializeRotues();
    }
    public initializeRotues() {
        this.router.get(`${this.path}/search/gig/:gigId`, this.gigById.bind(this));
        this.router.get(`${this.path}/search/gig/:from/:size/:type`, this.gigs.bind(this));
    }

    private async gigById(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await this.authService.getGig(req.params.gigId);
        res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
    }
    private async gigs(req: Request, res: Response): Promise<void> {
        const { from, size, type } = req.params;

        let query = '';
        const objList = Object.entries(req.query);
        const lastIndex = objList.length - 1;

        objList.forEach(([key, value], index) => {
            query += `${key}=${value}${index !== lastIndex} ? '&'`
        })

        const response: AxiosResponse = await this.authService.getGigs(`${query}`, from, size, type);
        res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs });
    }


}