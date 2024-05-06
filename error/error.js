export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
      success: false,
      status:err.status,
      message: err.message,
    });
  };
  
  
  class errorHandle extends Error{
    constructor(message,statusCode){
      super(message)
      this.statusCode=statusCode
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
  }
  export default errorHandle