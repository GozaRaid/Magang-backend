import autoBind from "auto-bind";

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, password } = request.payload;
    await this._service.addUser({ username, password });
    const response = h.response({
      status: "success",
      message: "User berhasil ditambahkan",
    });
    response.code(201);
    return response;
  }
}

export default UsersHandler;
