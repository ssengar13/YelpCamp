module.exports = func => {  //func we pass in
    return(req, res, next) => {  //this returns a new function that has func executed
        func(req, res, next).catch(next);
    } 
}

//basically, here we return a function that accepts a function and then it executes that function. 
//But it catches any errors and passes it to next.