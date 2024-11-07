import autoBind from "auto-bind";

class ScheduleHandler {
  constructor(scheduleService, validator) {
    this._scheduleService = scheduleService;
    this._validator = validator;
    autoBind(this);
  }

  async postScheduleHandler(request, h) {
    const { schedule } = request.payload;
    console.log(schedule);
    this._validator.validateSchedulePayload(schedule);
    await this._scheduleService.addSchedule({ schedule });
    const response = h
      .response({
        status: "success",
        message: "Success add schedule",
      })
      .code(201);
    return response;
  }

  async getScheduleHandler() {
    const data = await this._scheduleService.getSchedule();
    return {
      status: "success",
      data,
    };
  }

  async getScheduleByDateHandler() {
    const data = await this._scheduleService.getScheduleByDate();
    return {
      status: "success",
      data,
    };
  }

  async deleteScheduleHandler() {
    await this._scheduleService.deleteSchedule();
    return {
      status: "success",
      message: "Success delete schedule",
    };
  }
}

export default ScheduleHandler;
