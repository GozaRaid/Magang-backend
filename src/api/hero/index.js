import routes from "./routes.js";
import HeroHandler from "./handler.js";

export default {
  name: "hero",
  version: "1.0.0",
  register: async (server, { heroService, storageService, validator }) => {
    const heroHandler = new HeroHandler(heroService, storageService, validator);
    server.route(routes(heroHandler));
  },
};
