import autoBind from "auto-bind";

class AuthenticationsHandler {
  constructor(usersService, tokenManager, validator) {
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { username, password } = request.payload;
    const id = await this._usersService.verifyUserCredential(
      username,
      password
    );

    const accessToken = this._tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: "success",
      message: "Success login",
      data: {
        accessToken,
      },
    });
    response.code(200);
    return response;
  }
}

export default AuthenticationsHandler;
