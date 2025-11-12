const database = 'afluentDB';
use(database);

// Create a user
db.createCollection('User');
db.User.insertOne(
    {
        name: "John Doe",
        photo: "https://example.com/photos/johndoe.jpg",
        aikey: "a1b2c3d4e5f6g7h8i9j0",
        preferenceaimodel: "model_xyz",

        brainstorms: []
    },

    writeConcern: { w: "majority", j: true, wtimeout: 5000 }

)

// Create a brainstorm
db.createCollection('Brainstorm');
db.Brainstorm.insertOne(
    {
        userId: ObjectId("USER_OBJECT_ID"),
        name: "Novo brainstorm",
        context: "Contexto do brainstorm",
        date: new Date(),
        pool: {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1}
        }
    },
    
    { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
)

db.User.updateOne(
    { _id: ObjectId("USER_OBJECT_ID") },
    { $push: { brainstorms: ObjectId("BRAINSTORM_OBJECT_ID") } },
    { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
)

// Update a brainstorm to add a words, edges and update viewport to the pool

db.Brainstorm.updateOne(
    { _id: ObjectId("BRAINSTORMING_OBJECT_ID") },

    { 
        $push: { 
            "pool.nodes": {
                $each:[
                    {
                        nodeId: ObjectId(),
                        word: "example",
                        range: 1,
                        position: { x: 100, y: 150 },
                        category: "",
                        proximity: ""
                    },
                    {
                        nodeId: ObjectId(),
                        word: "example2",
                        range: 2,
                        position: { x: 200, y: 300 },
                        category: "",
                        proximity: ""
                    }
                ]
            },
            "pool.edges": {
                $each:[
                    {
                        edgeId: ObjectId(),
                        sourceNodeId: ObjectId("SOURCE_NODE_ID"),
                        targetNodeId: ObjectId("TARGET_NODE_ID"),
                        label: ""
                    }
                ]
            }
        },
        $set: {
            "pool.viewport": { x: 150, y: 200, zoom: 3}
        }
            
    },
    
    { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
)

// Create a Error log
db.createCollection('ErrorLog');
db.ErrorLog.insertOne(
    {
        message: JSON("Error message details"),
        date: new Date(),
    },
    
    { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
)