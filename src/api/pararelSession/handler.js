import autoBind from "auto-bind";

class PararelSessionHandler {
  constructor(pararelSessionService, validator) {
    this._pararelSessionService = pararelSessionService;
    this._validator = validator;

    autoBind(this);
  }

  async postPararelSessionHandler(request, h) {
    const { parallelSessions } = request.payload;
    this._validator.validateParalelSessionPayload(parallelSessions);
    await this._pararelSessionService.addParalelSession({ parallelSessions });
    const response = h
      .response({
        status: "success",
        message: "Success add paralel session",
      })
      .code(201);
    return response;
  }

  async getPararelSessionHandler() {
    const data = await this._pararelSessionService.getParallelSession();

    return {
      status: "success",
      data,
    };
  }

  async deletePararelSessionHandler() {
    await this._pararelSessionService.deletePararelSession();
    return {
      status: "success",
      message: "Success delete paralel session",
    };
  }
}

export default PararelSessionHandler;
