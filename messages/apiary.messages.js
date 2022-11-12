module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'Apiary created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Apiaries found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Apiary already exists',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Apiary deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Apiary for _id',
            type: 'success'
        }
    },
    error: {
        e0: {
            http: 404,
            code: 'Apiary not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        }
    }
}