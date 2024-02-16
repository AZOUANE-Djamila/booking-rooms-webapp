
const supertest = require('supertest')
var assert = require('assert')
const mongoose = require("mongoose")
const createServer = require("../MongoDbFolder/creatServer")



mongoose.connect(
    "mongodb+srv://azouanedjamila:ZHZQtlcjmS53MLw4@space-booking.n0zp5rh.mongodb.net/space-booking?retryWrites=true&w=majority",
    { useNewUrlParser: true },

)

const app = createServer();

const acc = { username: "test", password: "test" };

describe('Post Test request', () => {

    describe('Sign in with new Account', () => {

        it('should create a new Account with user and return 201', async () => {
            const expectedResult = 'Succesfully Account Added';

            const res = await supertest(app)
                .post('/SignIn')
                .send({
                    username: acc.username,
                    password: acc.password,
                })
                //.expect('Content-Type', 'application/json')
                .expect(function (res) {
                    assert(res.body.hasOwnProperty('status'));
                    assert(res.body.hasOwnProperty('message'));
                    assert.ok(res.text.includes(expectedResult));
                })
            expect(res.statusCode).toEqual(201);
            expect(res.body.data).not.toBeNull();

        })
    })

    describe('Sign in to already un existing account', () => {
        it('should return 404', async () => {

            const expectedResult = 'Account Exists';
            const res = await supertest(app)
                .post('/SignIn')
                .send({
                    username: acc.username,
                    password: acc.password,
                })
                //.expect('Content-Type', 'application/json')
                .expect(function (res) {
                    assert(res.body.hasOwnProperty('status'));
                    assert(res.body.hasOwnProperty('message'));
                    assert.ok(res.text.includes(expectedResult));
                })
            expect(res.statusCode).toEqual(404);
            expect(res.body.data).not.toBeNull();


        })
    })

    describe('empty body error', () => {
        it('should return status 400', async () => {
            const expectedResult = 'No Body';

            await supertest(app)
                .post('/SignIn')
                .send({})
                .expect(400)
                .expect((response) => {
                    assert.ok(response.text.includes(expectedResult));
                });
        });
    })
})


describe('Post Test request', () => {
    describe('Log in to existing Account', () => {
        it('should get user Account and status 200 ', async () => {

            const res = await supertest(app)
                .post('/login')
                .send({
                    username: acc.username,
                    password: acc.password,
                })
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).not.toBeNull();


        })
    })

    describe('Log in to non existing Account', () => {
        it('should get status 404 ', async () => {

            const res = await supertest(app)
                .get('/login')
                .send({
                    username: "hggdtf",
                    password: "pkdjd",
                })
            expect(res.statusCode).toEqual(404);



        })
    })
})


describe('Put Test request', () => {
    it('should update user and status 200', async () => {
        user_id = "630ae6859819b4caaf15ac8f";
        const data = {

            name: "ness",
            Balance: 100,
        }

        const res = await supertest(app)
            .put('/User/' + user_id)
            .send(data)
        expect(res.statusCode).toEqual(200);


    })

})
