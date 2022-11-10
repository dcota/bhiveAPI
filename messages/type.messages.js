module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'Type created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Types found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Type already exists',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Type deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Type for _id',
            type: 'success'
        }
    },
    error: {
        e0: {
            http: 404,
            code: 'Type not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        }
    }
}