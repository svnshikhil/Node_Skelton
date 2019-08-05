module.exports = {
    jsonSchemaValidator: (err, req, res, next) => {
        let responseData;

        if (err.name === 'JsonSchemaValidation') {
            // Log the error however you please 
            console.log(err.message);
            // logs "express-jsonschema: Invalid data found" 

            // Set a bad request http response status or whatever you want 
            res.status(400);

            // Format the response body however you want 
            responseData = {
                statusText: 'Bad Request',
                jsonSchemaValidation: true,
                validations: err.validations // All of your validation information 
            };

            // Take into account the content type if your app serves various content types 
            if (req.xhr || req.get('Content-Type') === 'application/json') {
                res.json(responseData);
            } else {
                // If this is an html request then you should probably have 
                // some type of Bad Request html template to respond with 
                res.json(responseData);
            }
        } else {
            // pass error to next error middleware handler 
            next(err);
        }
    },
    serverErrorHandler: (err, req, res) => {
        res.status(err.status || 500);
        res.end(JSON.stringify({
            message: err.message,
            error: {}
        }));
    }
}