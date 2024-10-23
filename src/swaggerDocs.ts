
require('dotenv').config();



const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 3000

export const swaggerDocs = {
    definition: {
      openapi: "3.0.0",
     
      info: {
        title: "PowerXAI Ingestion service",
        version: "v1",
        
        description:
          "API endpoints for PowerXAI Ingestion service",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        
      },
      servers: [
        {
          url: `${BASE_URL}:${PORT}`,
        },
      ],
      
    },
    apis: ["./apis.yaml"]
    
  };