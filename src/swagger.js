import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD API",
            version: "1.0.0",
            description: "API documentation for CRUD application",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                Member: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Project: {
                    type: "object",
                    required: ["name", "owner"],
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        owner: { type: "string" },
                        member: {
                            type: "array",
                            items: { type: "string" },
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },

            },
        },
    },
    apis: ["./src/routes/*.js"], // đường dẫn tới tất cả route có Swagger JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
