module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'Event created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Events found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Event active',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Event deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Events for device',
            type: 'success'
        },
        s6: {
            http: 200,
            code: 'Event not active',
            type: 'success'
        }
    },
    error: {
        e0: {
            http: 404,
            code: 'Events not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        }
    }
}