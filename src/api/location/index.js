import routes from "./routes.js";
import LocationHandler from "./handler.js";

export default {
  name: "location",
  version: "1.0.0",
  register: (server, { locationService, validator }) => {
    const locationHandler = new LocationHandler(locationService, validator);
    server.route(routes(locationHandler));
  },
};
