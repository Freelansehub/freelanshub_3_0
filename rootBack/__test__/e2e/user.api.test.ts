import request from 'supertest';
import { app } from '../../src/app';
import db from '../../src/repositories/db'; // Assuming this is where DB connections are

let server: any;

describe('/user', () => {
    beforeAll(() => {
        server = app.listen(8080);
    });

    afterAll(async () => {
        await new Promise<void>((resolve, reject) => {
            server.close((err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });

        if (db) {
            await db.end();
        }
    });

    it('milf', async () => {
        const response = await request(app)
            .get('/user/user')
            .expect(200);

        expect(response.body).toEqual({
            rows: [
                {
                    id: 1,
                    name: 'AlexBram',
                    email: 'AlexBram003@gmail.com',
                    password: 'password',
                    phone: 'phone',
                },
            ],
        });
    });
});
