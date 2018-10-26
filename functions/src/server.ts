// require all dependencies to set up server
import * as express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// cors allows our server to accept requests from different origins
import * as cors from "cors";

export function configureServer() {
  // invoke express to create our server
  const app = express();
  //use the cors middleware
  app.use(cors());

  // Simple graphql schema
  const typeDefs = gql`
    type TimeSegment {
      startTime: Int
      endTime: Int
    }
    type TimeDetails {
      runTimeSegments: [TimeSegment]
      walkTimeSegments: [TimeSegment]
    }
    type GeoPoint {
      longitude: String!
      latitude: String!
    }
    type Query {
      "iot app comm example service"
      hello: String
      stepCount: Int
      runTime: Int
      walkTime: Int
      activeTimeDetails: TimeDetails
      location: GeoPoint
    }
  `;
  // Very simple resolver that returns "world" for the hello query
  const resolvers = {
    Query: {
      hello: () => "world",
      stepCount: () => 128,
      runTime: () => 60,
      walkTime: () => 5,
      activeTimeDetails: () => (
        {
          runTimeSegments: [
            {startTime: 360, endTime: 420}, 
            {startTime: 900, endTime: 960}
          ],
          walkTimeSegments: [
            {startTime: 600, endTime: 860}, 
            {startTime: 1200, endTime: 1600}
          ]
        }
      ),
      location: () => (
        { // osaka
          longitude: "135.69296597528",
          latitude: "34.77103892591"
        }
      )

    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  // now we take our newly instantiated ApolloServer and apply the
  // previously configured express application
  server.applyMiddleware({ app });
  // finally return the application
  return app;
}
