import autoBind from "auto-bind";

class SpeakersHandler {
  constructor(speakerService, storageService, validator) {
    this._speakerService = speakerService;
    this._storageService = storageService;
    this._validator = validator;
    autoBind(this);
  }

  async postSpeakerHandler(request, h) {
    const { name, bio, image } = request.payload;

    this._validator.validateSpeakerCover(image.hapi.headers);

    this._validator.validateSpeakerPayload({ name, bio });
    const host = request.headers.host;
    const filename = await this._storageService.writeFile(image, image.hapi);
    const image_url = `http://${host}/speakers/images/${filename}`;

    await this._speakerService.addSpeakers({
      name,
      bio,
      image_url,
    });

    const response = h
      .response({
        status: "success",
        message: "Success update speakers section",
      })
      .code(201);
    return response;
  }

  async getSpeakersHandler() {
    const speakers = await this._speakerService.getSpeakers();
    return {
      status: "success",
      speakers,
    };
  }

  async putSpeakersByIdHandler(request, h) {
    const { id } = request.params;
    const { name, bio } = request.payload;

    await this._speakerService.editSpeakersById({
      id,
      name,
      bio,
    });
    const reponse = h
      .response({
        status: "success",
        message: "Success update speakers section",
      })
      .code(201);
    return reponse;
  }

  async deleteSpeakersByIdHandler(request, h) {
    const { id } = request.params;
    const image_url = await this._speakerService.deleteSpeakersById(id);
    let filenameDelete;

    filenameDelete = image_url.split("/speakers/images/").pop();
    await this._storageService.deleteFile(filenameDelete);

    return {
      status: "success",
      message: "Success delete speakers section",
    };
  }
}

export default SpeakersHandler;
