import autoBind from "auto-bind";

class HeroHandler {
  constructor(heroService, storageService, validator) {
    this._heroService = heroService;
    this._storageService = storageService;
    this._validator = validator;
    autoBind(this);
  }

  async postHeroHandler(request, h) {
    const { title, city, image, id } = request.payload;
    this._validator.validateHeroPayload({ title, city });

    if (image) {
      this._validator.validateHeroCover(image.hapi.headers);
      const host = request.headers.host;
      const filename = await this._storageService.writeFile(image, image.hapi);
      const image_url = `http://${host}/hero/images/${filename}`;
      await this._heroService.addHero({ title, city, image_url });
    } else {
      await this._heroService.addHeroTitleCity({ title, city, id });
    }

    const response = h
      .response({
        status: "success",
        message: "Success update hero section",
      })
      .code(201);
    return response;
  }

  async getHeroHandler() {
    const data = await this._heroService.getHero();
    return {
      status: "success",
      data,
    };
  }

  async deleteHeroHandler() {
    const data = await this._heroService.getHero();
    const filename = data[0].image_url.split("/hero/images/").pop();
    await this._storageService.deleteFile(filename);
    await this._heroService.deleteHero();
    return {
      status: "success",
      message: "Success delete hero section",
    };
  }
}

export default HeroHandler;
