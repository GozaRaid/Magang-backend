import autoBind from "auto-bind";

class LocationHandler {
  constructor(locationService, validator) {
    this._locationService = locationService;
    this._validator = validator;
    autoBind(this);
  }
  async postLocationHandler(request, h) {
    this._validator.validateLocationPayload(request.payload);
    await this._locationService.addLocation(request.payload);
    const response = h
      .response({
        status: "success",
        message: "Success add location",
      })
      .code(201);
    return response;
  }

  async getLocationsHandler() {
    const data = await this._locationService.getLocation();
    return {
      status: "success",
      data,
    };
  }

  async deleteLocationHandler() {
    await this._locationService.deleteLocation();
    return {
      status: "success",
      message: "Success delete location",
    };
  }
}

export default LocationHandler;
