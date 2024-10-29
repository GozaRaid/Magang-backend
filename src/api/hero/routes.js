import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = (handler) => [
  {
    method: "POST",
    path: "/hero",
    handler: (request, h) => handler.postHeroHandler(request, h),
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        output: "stream",
        maxBytes: 5000000,
      },
      auth: "icodsa_schedule_jwt",
    },
  },
  {
    method: "GET",
    path: "/hero",
    handler: () => handler.getHeroHandler(),
  },
  {
    method: "GET",
    path: "/hero/images/{param*}",
    handler: {
      directory: {
        path: path.resolve(__dirname, "file/images"),
        redirectToSlash: true, // Optional: Adds a slash if it's missing
        index: false,
      },
    },
  },
  {
    method: "DELETE",
    path: "/hero",
    handler: () => handler.deleteHeroHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
