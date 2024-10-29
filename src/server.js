import "dotenv/config";
import Hapi from "@hapi/hapi";
import Jwt from "@hapi/jwt";
import Inert from "@hapi/inert";
import ClientError from "./exceptions/ClientError.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// users
import users from "./api/users/index.js";
import UsersService from "./services/postgres/usersService.js";
import UsersValidator from "./validator/users/index.js";

// authentications
import authentications from "./api/authentications/index.js";
import AuthenticationsValidator from "./validator/authentications/index.js";
import TokenManager from "./tokenize/TokenManager.js";

// hero
import hero from "./api/hero/index.js";
import HeroValidator from "./validator/hero/index.js";
import HeroService from "./services/postgres/heroService.js";

// about
import about from "./api/about/index.js";
import AboutValidator from "./validator/about/index.js";
import AboutService from "./services/postgres/aboutService.js";
import ConferenceValidator from "./validator/conference/index.js";
import ConferenceService from "./services/postgres/conferenceService.js";

// schedule
import schedule from "./api/schedule/index.js";
import ScheduleValidator from "./validator/schedule/index.js";
import ScheduleService from "./services/postgres/scheduleService.js";

// speakers
import speakers from "./api/speakers/index.js";
import SpeakerValidator from "./validator/speakers/index.js";
import SpeakersService from "./services/postgres/speakersService.js";

// location
import location from "./api/location/index.js";
import LocationValidator from "./validator/location/index.js";
import LocationService from "./services/postgres/locationService.js";

// image storage
import StorageService from "./services/storage/StorageService.js";

const init = async () => {
  const usersService = new UsersService();
  const heroService = new HeroService();
  const storageHeroService = new StorageService(
    path.resolve(__dirname, "api/hero/file/images")
  );
  const aboutService = new AboutService();
  const conferenceService = new ConferenceService();
  const scheduleService = new ScheduleService();
  const speakersService = new SpeakersService();
  const storageSpeakerService = new StorageService(
    path.resolve(__dirname, "api/speakers/file/images")
  );
  const locationService = new LocationService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy("icodsa_schedule_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        usersService: usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: hero,
      options: {
        heroService: heroService,
        storageService: storageHeroService,
        validator: HeroValidator,
      },
    },
    {
      plugin: about,
      options: {
        aboutService: aboutService,
        conferenceService: conferenceService,
        validatorAbout: AboutValidator,
        validatorConference: ConferenceValidator,
      },
    },
    {
      plugin: schedule,
      options: {
        scheduleService: scheduleService,
        validator: ScheduleValidator,
      },
    },
    {
      plugin: speakers,
      options: {
        speakerService: speakersService,
        storageService: storageSpeakerService,
        validator: SpeakerValidator,
      },
    },
    {
      plugin: location,
      options: {
        locationService: locationService,
        validator: LocationValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: "error",
        message: "There is a problem with our server",
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server Running at ${server.info.uri}`);
};

init();
