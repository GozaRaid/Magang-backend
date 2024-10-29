import routes from "./routes.js";
import ScheduleHandler from "./handler.js";

export default {
  name: "schedule",
  version: "1.0.0",
  register: async (server, { scheduleService, validator }) => {
    const handler = new ScheduleHandler(scheduleService, validator);
    server.route(routes(handler));
  },
};
