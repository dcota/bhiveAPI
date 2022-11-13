module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'Device created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Device found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Device already exists',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Device deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Device for _id',
            type: 'success'
        },
        s6: {
            http: 200,
            code: 'Device assigned',
            type: 'success'
        },
        s7: {
            http: 200,
            code: 'New data received',
            type: 'success'
        },
    },
    error: {
        e0: {
            http: 404,
            type: 'error',
            code: 'Device not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        },
        e2: {
            http: 401,
            type: 'error',
            code: 'Device already assigned'
        },
    }
}