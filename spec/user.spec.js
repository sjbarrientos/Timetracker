var Request = require("request");

describe("Server", () => {
    var app;
    beforeAll(() => {
        app = require("../server/server");
    });
    afterAll(() => {
        app.close();
    });

    describe("GET: User - Request a list of users", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/api/users", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.message).not.toBe("This is an error response");
        });
    });
   
});