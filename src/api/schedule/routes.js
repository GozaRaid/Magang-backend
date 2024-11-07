const routes = (handler) => [
  {
    method: "POST",
    path: "/schedule",
    handler: (request, h) => handler.postScheduleHandler(request, h),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
  {
    method: "GET",
    path: "/schedule",
    handler: () => handler.getScheduleHandler(),
  },
  {
    method: "GET",
    path: "/schedule/date",
    handler: () => handler.getScheduleByDateHandler(),
  },
  {
    method: "DELETE",
    path: "/schedule",
    handler: () => handler.deleteScheduleHandler(),
    options: {
      auth: "icodsa_schedule_jwt",
    },
  },
];

export default routes;
