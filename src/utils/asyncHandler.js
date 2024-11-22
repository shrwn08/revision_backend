const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {

    const statusCode = typeof error.code === "number" ? error.code : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || "server error",
    });
  }
};

export { asyncHandler };







/**
 * const asyncHandler = (requestHandler)=>{
 * (req, res, next)=>{
 * Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
 * }
 * }
 */
