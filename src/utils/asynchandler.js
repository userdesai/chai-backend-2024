const asynchandler=(requesthandler)=>{
      (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((error)=>next(error))
      }
}

/* 
1:- asynchandler function :
const asynchandler = (requesthandler) => {...}
This is a higher-order function, which means it takes another function (requesthandler) as an argument and returns a new function.

2:- Returned Function:
The asynchandler function returns a new function: (req, res, next) => {...}.
This returned function is what actually gets executed when a request is made.
*/


// map, filter, and reduce are all higher-order functions in JavaScript. A higher-order function is a function that either takes one or more functions as arguments or returns a function as a result.

/*
map:-  takes a function that applies a transformation to each array element.
filter:-  takes a function that determines whether each element should be included in the new array.
reduce:- takes a function that accumulates all elements of an array into a single value.
*/




// const asynchandler=(fn)=> async(req,res,next)=>{
//     try {
//        await fn(req,res,next) 
//     } catch (error) {
//        res.status(error.code || 500).json({success:false,message:error.message})
//     }
// }