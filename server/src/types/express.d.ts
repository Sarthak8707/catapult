declare global {
    namespace Express {
        interface Request {
            user : {
                id: number,
                username: string
            },
            sdk: {
                projectID: number,
                environment: string
            }
        }
    }
}


export {};