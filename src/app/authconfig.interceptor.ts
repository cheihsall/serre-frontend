import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { RealtimeService } from "./realtime.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService:RealtimeService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}
