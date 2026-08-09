 class ApiResponse {    
    constructor(res, message, data = null) {
        return res.status(200).json({
            status: 200,
            message: message,
            data: data
        });
    }

    static ok(res, message, data = null) {
        return res.status(200).json({
            status: 200,
            message: message,
            data: data
        });
    }

    static created(res, message, data = null) {
        return res.status(201).json({
            status: 201,
            message: message,
            data: data
        });
    
    }
}


export default ApiResponse;