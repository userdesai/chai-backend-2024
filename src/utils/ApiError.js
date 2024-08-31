class ApiError extends Error{
    constructor(
        statuscode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statuscode=statuscode
        this.errors=errors
        this.data=null
        this.message=message
        this.success=false

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}



/*
import { ApiError } from './path/to/ApiError';

app.get('/some-endpoint', (req, res, next) => {
    try {
        // Some logic that might throw an error
        throw new ApiError(404, "Resource not found");
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
*/