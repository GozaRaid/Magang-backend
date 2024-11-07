const routes = (handler) => [
  {
    method: "POST",
    path: "/pararel-sessions",
    handler: (request, h) => handler.postPararelSessionHandler(request, h),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
  {
    method: "GET",
    path: "/pararel-sessions",
    handler: () => handler.getPararelSessionHandler(),
  },
  {
    method: "DELETE",
    path: "/pararel-sessions",
    handler: () => handler.deletePararelSessionHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
