import {Application} from "express";
import JwtMiddleware from "../middlewares/jwt.middleware";

type myRoute = {
    url:string,
    method:string,
    func:any,
    authMethod?:string
}
export class CommonController {
    private routes:myRoute[];

    constructor(app: Application) {
        for(const route of this.routes){
            const funcs = [];
            //adding JWT auth to route
            if(route.authMethod==='jwt'){
                funcs.push(JwtMiddleware.authenticateJWT);
            }
            funcs.push(route.func);
            switch (route.method){


                case "get":
                    app.route(route.url).get(funcs);
                    break;
                case "post":
                    app.route(route.url).post(funcs);
                    break;
                case "put":
                    app.route(route.url).put(funcs);
                    break;
                case "patch":
                    app.route(route.url).patch(funcs);
                    break;
                case "delete":
                    app.route(route.url).delete(funcs);
                    break;
                default:
                    console.error(`Wrong method ${route.method}`);
            }

        }
    }
    addRoute(url:string,method:string,func:any, authMethod?:string){
        if(!this.routes){
            this.routes=[];
        }
        this.routes.push({
            url,
            method,
            func,
            authMethod
        });
    }

}