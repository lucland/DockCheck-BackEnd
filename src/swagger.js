const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DockCheck API',
      description: 'DockCheck API Information',
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:3000'],
      version: '1.0.0',
    },
    components: {
        schemas: {
          Company: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The auto-generated ID of the company',
              },
              name: {
                type: 'string',
                description: 'The name of the company',
              },
              logo: {
                type: 'string',
                description: 'The logo of the company',
              },
              supervisors: {
                type: 'array',
                description: 'The supervisors of the company',
              },
              vessels: {
                type: 'array',
                description: 'The vessels of the company',
              },
              updated_at: {
                type: 'date',
                description: 'The date of the last update',
              },
              expiration_date: {
                type: 'date',
                description: 'The date of the last update',
              },
            },
          },
          Vessel: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The auto-generated ID of the vessel',
              },
              name: {
                type: 'string',
                description: 'The name of the vessel',
              },
                company_id: {
                    type: 'string',
                    description: 'The company ID of the vessel',
                },
                updated_at: {
                    type: 'date',
                    description: 'The date of the last update',
                },
                admins: {
                    type: 'array',
                    description: 'The admins of the vessel',
                },
                onboarded_count: {
                    type: 'integer',
                    description: 'The number of onboarded',
                },
                portals: {
                    type: 'array',
                    description: 'The portals of the vessel',
                },
                        },
          },
          Docking: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'The auto-generated ID of the docking',
                      },
                      onboarded_count: {
                        type: 'integer',
                        description: 'The count of onboarded entities',
                      },
                        date_start: {
                            type: 'date',
                            description: 'The start date of the docking',
                        },
                        date_end: {
                            type: 'date',
                            description: 'The end date of the docking',
                        },
                        admins: {
                            type: 'array',
                            description: 'The admins of the docking',
                        },
                        vessel_id: {
                            type: 'string',
                            description: 'The vessel ID of the docking',
                        },
                        updated_at: {
                            type: 'date',
                            description: 'The date of the last update',
                        },
                        draft_meters: {
                            type: 'double',
                            description: 'The draft in meters',
                        },
                    },
          },
          Portal: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            description: 'The auto-generated ID of the portal',
                          },
                          name: {
                            type: 'string',
                            description: 'The name of the portal',
                          },
                        rfid_status: {
                            type: 'integer',
                            description: 'The status of the RFID',
                        },
                        rfid_ip: {
                            type: 'string',
                            description: 'The IP of the RFID',
                        },
                        camera_status: {
                            type: 'integer',
                            description: 'The status of the camera',
                        },
                        camera_ip: {
                            type: 'string',
                            description: 'The IP of the camera',
                        },
                        vessel_id: {
                            type: 'string',
                            description: 'The vessel ID of the portal',
                        },
                        created_at: {
                            type: 'date',
                            description: 'The date of the creation',
                        },
                        updated_at: {
                            type: 'date',
                            description: 'The date of the last update',
                        },
                        },
          },
          Event: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            description: 'The auto-generated ID of the event',
                          },
                          portal_id: {
                            type: 'string',
                            description: 'The ID of the portal where the event occurred',
                          },
                          user_id: {
                            type: 'string',
                            description: 'The ID of the user who triggered the event',
                          },
                          timestamp: {
                            type: 'date',
                            description: 'The date of the event',
                          },
                            direction: {
                                type: 'integer',
                                description: 'The direction of the event',
                            },
                            picture: {
                                type: 'string',
                                description: 'The picture of the event',
                            },
                            vessel_id: {
                                type: 'string',
                                description: 'The vessel ID of the event',
                            },
                            action: {
                                type: 'integer',
                                description: 'The action of the event',
                            },
    
                        },
          },
          Supervisor: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            description: 'The auto-generated ID of the supervisor',
                          },
                          name: {
                            type: 'string',
                            description: 'The name of the supervisor',
                          },
                            user: {
                                type: 'string',
                                description: 'The user of the supervisor',
                            },
                            password: {
                                type: 'string',
                                description: 'The password of the supervisor',
                            },
                            company_id: {
                                type: 'string',
                                description: 'The company ID of the supervisor',
                            },
                            updated_at: {
                                type: 'date',
                                description: 'The date of the last update',
                            },
                        },
          },
          User: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            description: 'The auto-generated ID of the user',
                          },
                          name: {
                            type: 'string',
                            description: 'The name of the user',
                          },
                          vessel_id: {
                            type: 'string',
                            description: 'The vessel ID of the user',
                          },
                            created_at: {
                                type: 'date',
                                description: 'The date of the creation',
                            },
                            updated_at: {
                                type: 'date',
                                description: 'The date of the last update',
                            },
                            company: {
                                type: 'string',
                                description: 'The company ID of the user',
                            },
                            picture: {
                                type: 'string',
                                description: 'The picture of the user',
                            },
                            role: {
                                type: 'string',
                                description: 'The role of the user',
                            },
                            project: {
                                type: 'string',
                                description: 'The project of the user',
                            },
                            number: {
                                type: 'integer',
                                description: 'The number of the user',
                            },
                            identidade: {
                                type: 'string',
                                description: 'The identidade of the user',
                            },
                            cpf: {
                                type: 'string',
                                description: 'The cpf of the user',
                            },
                            aso: {
                                type: 'date',
                                description: 'The aso of the user',
                            },
                            aso_document: {
                                type: 'string',
                                description: 'The aso_document of the user',
                            },
                            nr34: {
                                type: 'date',
                                description: 'The nr34 of the user',
                            },
                            nr34_document: {
                                type: 'string',
                                description: 'The nr34_document of the user',
                            },
                            nr35: {
                                type: 'date',
                                description: 'The nr35 of the user',
                            },
                            nr35_document: {
                                type: 'string',
                                description: 'The nr35_document of the user',
                            },
                            nr33: {
                                type: 'date',
                                description: 'The nr33 of the user',
                            },
                            nr33_document: {
                                type: 'string',
                                description: 'The nr33_document of the user',
                            },
                            email: {
                                type: 'string',
                                description: 'The email of the user',
                            },
                            area: {
                                type: 'string',
                                description: 'The area of the user',
                            },
                            is_admin: {
                                type: 'boolean',
                                description: 'The is_admin of the user',
                            },
                            is_visitor: {
                                type: 'boolean',
                                description: 'The is_visitor of the user',
                            },
                            is_blocked: {
                                type: 'boolean',
                                description: 'The is_blocked of the user',
                            },
                            block_reason: {
                                type: 'string',
                                description: 'The block_reason of the user',
                            },
                            rfid: {
                                type: 'string',
                                description: 'The rfid of the user',
                            },
                            events: {
                                type: 'array',
                                description: 'The events of the user',
                            },
                            type_job: {
                                type: 'string',
                                description: 'The type_job of the user',
                            },
                            start_job: {
                                type: 'date',
                                description: 'The start_job of the user',
                            },
                            end_job: {
                                type: 'date',
                                description: 'The end_job of the user',
                            },
                            user : {
                                type: 'string',
                                description: 'The user of the user',
                            },
                            password : {
                                type: 'string',
                                description: 'The password of the user',
                            },
                        },
          },
        },
      },
  },
  apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
