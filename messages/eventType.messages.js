module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'Event type created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Event types found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Event type already exists',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Event type deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Event type for _id',
            type: 'success'
        }
    },
    error: {
        e0: {
            http: 404,
            code: 'Event type not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        }
    }
}