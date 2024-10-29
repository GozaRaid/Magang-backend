const routes = (handler) => [
  {
    method: "POST",
    path: "/location",
    handler: (request, h) => handler.postLocationHandler(request, h),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
  {
    method: "GET",
    path: "/location",
    handler: () => handler.getLocationsHandler(),
  },
  {
    method: "DELETE",
    path: "/location",
    handler: () => handler.deleteLocationHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
