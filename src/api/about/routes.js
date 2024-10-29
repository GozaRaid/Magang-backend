const routes = (handler) => [
  {
    method: "POST",
    path: "/about",
    handler: (request, h) => handler.postAboutHandler(request, h),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: () => handler.getAboutHandler(),
  },
  {
    method: "DELETE",
    path: "/about",
    handler: () => handler.deleteAboutHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
