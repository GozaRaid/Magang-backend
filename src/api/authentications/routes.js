const routes = (handler) => [
  {
    method: "POST",
    path: "/authentications",
    handler: (request, h) => handler.postAuthenticationHandler(request, h),
  },
];

export default routes;
