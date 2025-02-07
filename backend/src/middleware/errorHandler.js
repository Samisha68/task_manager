const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({ 
        error: 'Database operation failed',
        details: err.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  };
  
  export default errorHandler;