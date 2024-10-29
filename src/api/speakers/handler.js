import autoBind from "auto-bind";

class SpeakersHandler {
  constructor(speakerService, storageService, validator) {
    this._speakerService = speakerService;
    this._storageService = storageService;
    this._validator = validator;
    autoBind(this);
  }

  async postSpeakerHandler(request, h) {
    const { speakers, ...images } = request.payload;
    let parsedPayload;

    // If it's an array (multiple speakers)
    if (Array.isArray(speakers)) {
      parsedPayload = speakers.map((item) => {
        if (typeof item === "string") {
          return JSON.parse(item.replace(/'/g, '"'));
        }
        return item;
      });
    }
    // If it's a single speaker (object as string)
    else if (typeof speakers === "string") {
      parsedPayload = JSON.parse(speakers.replace(/'/g, '"'));
    }
    // If it's already an object
    else {
      parsedPayload = speakers;
    }

    Object.keys(images).forEach((key) => {
      if (key.startsWith("image_")) {
        const image = request.payload[key];
        this._validator.validateSpeakerCover(image.hapi.headers);
      }
    });
    this._validator.validateSpeakerPayload(parsedPayload);
    const imageUrls = [];
    const host = request.headers.host;
    for (const key in images) {
      if (key.startsWith("image_")) {
        const image = request.payload[key];
        const filename = await this._storageService.writeFile(
          image,
          image.hapi
        );
        imageUrls.push(`http://${host}/speakers/images/${filename}`);
      }
    }

    await this._speakerService.addSpeakers({
      speakers: parsedPayload,
      image_url: imageUrls,
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

  async deleteSpeakersHandler() {
    const data = await this._speakerService.getSpeakers();
    let filenameDelete;
    for (let i = 0; i < data.length; i++) {
      filenameDelete = data[i].image_url.split("/speakers/images/").pop();
      await this._storageService.deleteFile(filenameDelete);
    }
    await this._speakerService.deleteSpeakers();
    return {
      status: "success",
      message: "Success delete speakers section",
    };
  }
}

export default SpeakersHandler;
// {
//   speakers: [
//       {
//         name: 'Assoc. Prof. Dr. Hoshang Kolivand',
//         bio: 'School of Computer Science and Mathematics, Liverpool John Moores University, England'
//       },
//       {
//         name: 'Assoc Prof. Dr. Satria Mandala',
//         bio: 'Director CoE Humic Engineering, Telkom University, Bandung Indonesia'
//       },
//       {
//         name: 'Prof. Hui-Min David Wang',
//         bio: 'Department of Chemical Engineering, Institute of Biomedical Engineering, National Chung Hsing University, Taiwan'
//       },
//       {
//         name: 'Prof. Dimitrios Georgakopoulos',
//         bio: 'Director, ARC Industrial Transformation Research Hub for Future Digital Manufacturing, Swinburne University of Technology, Australia'
//       }
//     ],
//   image_0: Readable {
//       _events: {
//         close: undefined,
//         error: undefined,
//         data: undefined,
//         end: undefined,
//         readable: undefined
//       },
//       _readableState: ReadableState {
//         highWaterMark: 16384,
//         buffer: [],
//         bufferIndex: 0,
//         length: 0,
//         pipes: [],
//         awaitDrainWriters: null,
//         [Symbol(kState)]: 1052940
//       },
//       _maxListeners: undefined,
//       _data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 08 07 06 09 08 07 08 0a 0a 09 0b 0d 16 0f 0d 0c 0c 0d 1b 14 15 10 ... 58909 more bytes>,
//       _position: 0,
//       _encoding: 'utf8',
//       hapi: { filename: 'HoshangKolivand.jpg', headers: [Object] },
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//     },
//     image_1: Readable {
//       _events: {
//         close: undefined,
//         error: undefined,
//         data: undefined,
//         end: undefined,
//         readable: undefined
//       },
//       _readableState: ReadableState {
//         highWaterMark: 16384,
//         buffer: [],
//         bufferIndex: 0,
//         length: 0,
//         pipes: [],
//         awaitDrainWriters: null,
//         [Symbol(kState)]: 1052940
//       },
//       _maxListeners: undefined,
//       _data: <Buffer 52 49 46 46 5e 5e 00 00 57 45 42 50 56 50 38 20 52 5e 00 00 50 0e 03 9d 01 2a 3c 02 04 03 3e 49 22 8d 44 a2 a6 2d 28 a9 73 ca 41 a0 09 09 67 6e 65 87 ... 24116 more bytes>,
//       _position: 0,
//       _encoding: 'utf8',
//       hapi: { filename: 'Satrianew.jpg', headers: [Object] },
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//     },
//     image_2: Readable {
//       _events: {
//         close: undefined,
//         error: undefined,
//         data: undefined,
//         end: undefined,
//         readable: undefined
//       },
//       _readableState: ReadableState {
//         highWaterMark: 16384,
//         buffer: [],
//         bufferIndex: 0,
//         length: 0,
//         pipes: [],
//         awaitDrainWriters: null,
//         [Symbol(kState)]: 1052940
//       },
//       _maxListeners: undefined,
//       _data: <Buffer 52 49 46 46 de 49 00 00 57 45 42 50 56 50 38 20 d2 49 00 00 30 32 02 9d 01 2a 3c 02 04 03 3e 49 24 8e 45 22 a4 28 25 26 93 6a 11 00 09 09 67 2a 34 86 ... 18868 more bytes>,
//       _position: 0,
//       _encoding: 'utf8',
//       hapi: { filename: 'HuiMinnew.jpg', headers: [Object] },
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//     },
//     image_3: Readable {
//       _events: {
//         close: undefined,
//         error: undefined,
//         data: undefined,
//         end: undefined,
//         readable: undefined
//       },
//       _readableState: ReadableState {
//         highWaterMark: 16384,
//         buffer: [],
//         bufferIndex: 0,
//         length: 0,
//         pipes: [],
//         awaitDrainWriters: null,
//         [Symbol(kState)]: 1052940
//       },
//       _maxListeners: undefined,
//       _data: <Buffer 52 49 46 46 96 93 00 00 57 45 42 50 56 50 38 20 8a 93 00 00 f0 9a 03 9d 01 2a 3c 02 04 03 3e 49 20 8d 44 a2 a2 21 26 2b 13 6a a0 c0 09 09 67 6c c1 b7 ... 37740 more bytes>,
//       _position: 0,
//       _encoding: 'utf8',
//       hapi: { filename: 'Dimitriosneww.jpg', headers: [Object] },
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//   }
// }
