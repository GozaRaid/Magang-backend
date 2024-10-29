import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = (handler) => [
  {
    method: "POST",
    path: "/speakers",
    handler: (request, h) => handler.postSpeakerHandler(request, h),
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
    path: "/speakers",
    handler: () => handler.getSpeakersHandler(),
  },
  {
    method: "GET",
    path: "/speakers/images/{param*}",
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
    path: "/speakers",
    handler: () => handler.deleteSpeakersHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
