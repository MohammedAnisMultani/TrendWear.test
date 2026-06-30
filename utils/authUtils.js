const userValidationFn = ({name,username,email,password,cpassword}) => {

    return new Promise((res,rej)=>{

        if(typeof name !== 'string') rej("Name is not a String");
        if(typeof username !== 'string') rej('username is not a string')
        if(typeof email !== 'string') rej('email is not a string')
        if(typeof password !== 'string') rej('password is not a string')
        if(typeof cpassword !== 'string') rej('cpassword is not a string')
            // if(password !== cpassword) rej(`password doesn't matched`)   
            
        res();
    })
}

export default userValidationFn