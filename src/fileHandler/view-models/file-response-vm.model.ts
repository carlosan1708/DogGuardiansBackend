export class FileResponseVm {
  message: string;

  file: {
    length: number;

    chunkSize: number;

    filename: string;

    md5: string;

    contentType: string;
  };
}
