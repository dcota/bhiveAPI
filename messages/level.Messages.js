module.exports = {
    success: {
        s0: {
            http: 201,
            code: 'TLevel created',
            type: 'success'
        },
        s1: {
            http: 200,
            code: 'Levels found',
            type: 'success'
        },
        s3: {
            http: 200,
            code: 'Level already exists',
            type: 'success'
        },
        s4: {
            http: 200,
            code: 'Level deleted',
            type: 'success'
        },
        s5: {
            http: 200,
            code: 'Level for _id',
            type: 'success'
        }
    },
    error: {
        e0: {
            http: 404,
            code: 'Level not found'
        },
        e1: {
            http: 500,
            code: 'Internal Server Error'
        }
    }
}