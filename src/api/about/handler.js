import autoBind from "auto-bind";

class AboutHandler {
  constructor(
    aboutService,
    conferenceService,
    validatorAbout,
    validatorConference
  ) {
    this._aboutService = aboutService;
    this._conferenceService = conferenceService;
    this._validatorAbout = validatorAbout;
    this._validatorConference = validatorConference;
    autoBind(this);
  }

  async postAboutHandler(request, h) {
    const { aboutDescription, conferences, where, who } = request.payload;
    this._validatorConference.validateConferencePayload(conferences);
    this._validatorAbout.validateAboutPayload({
      aboutDescription,
      where,
      who,
    });
    const conference_id = await this._conferenceService.postConference(
      conferences
    );

    await this._aboutService.postAbout({
      aboutDescription,
      conference_id,
      where,
      who,
    });

    const response = h
      .response({
        status: "success",
        message: "Success add about",
      })
      .code(201);
    return response;
  }

  async getAboutHandler() {
    const data = await this._aboutService.getAbout();
    return {
      status: "success",
      data,
    };
  }

  async deleteAboutHandler() {
    await this._aboutService.deleteAbout();
    await this._conferenceService.deleteConference();
    return {
      status: "success",
      message: "Success delete about",
    };
  }
}

export default AboutHandler;
